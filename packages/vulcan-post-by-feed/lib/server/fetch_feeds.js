import { toMarkdown } from 'to-markdown';
import he from 'he';
import FeedParser from 'feedparser';
import { Readable } from 'stream';
import iconv from 'iconv-lite';
import moment from 'moment';

import { getSetting, newMutation } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Posts from 'meteor/vulcan:posts';
import Categories from 'meteor/vulcan:categories';
import Feeds from '../collection.js';

export const getFirstAdminUser = function() {
  return Users.adminUsers({ sort: { createdAt: 1 }, limit: 1 })[0];
};

const normalizeEncoding = function (contentBuffer) {
  // got from https://github.com/szwacz/sputnik/
  let encoding;
  let content = contentBuffer.toString();

  const xmlDeclaration = content.match(/^<\?xml .*\?>/);
  if (xmlDeclaration) {
    const encodingDeclaration = xmlDeclaration[0].match(/encoding=("|').*?("|')/);
    if (encodingDeclaration) {
      encoding = encodingDeclaration[0].substring(10, encodingDeclaration[0].length - 1);
    }
  }

  if (encoding && encoding.toLowerCase() !== 'utf-8') {
    try {
      content = iconv.decode(contentBuffer, encoding);
    } catch (err) {
      // detected encoding is not supported, leave it as it is
    }
  }

  return content;
};

const feedHandler = {
  getStream(content) {
    let stream = new Readable();
    stream.push(content);
    stream.push(null);

    return stream;
  },

  getItemCategories(item, feedCategories) {

    let itemCategories = [];

    // loop over RSS categories for the current item if it has any
    if (item.categories && item.categories.length > 0) {
      item.categories.forEach(function(name) {

        // if the RSS category corresponds to a Nova cateogry, add it
        const category = Categories.findOne({ name: name }, { fields: {_id: 1 } });
        if (category) {
          itemCategories.push(category._id);
        }

      });
    }

    // add predefined feed categories if there are any and remove any duplicates
    if (!!feedCategories) {
      itemCategories = _.uniq(itemCategories.concat(feedCategories));
    }

    return itemCategories;
  },

  handle(contentBuffer, userId, feedCategories, feedId) {
    const self = this;
    const content = normalizeEncoding(contentBuffer);
    const stream = this.getStream(content);
    const feedParser = new FeedParser();
    let newItemsCount = 0;

    stream.pipe(feedParser);

    feedParser.on('meta', Meteor.bindEnvironment(function (meta) {
      console.log('// Parsing RSS feed: '+ meta.title);

      const currentFeed = Feeds.findOne({ _id: feedId }, { fields: { _id: 1, title: 1 } });
      if (!currentFeed.title || currentFeed.title !== meta.title) {
        Feeds.update({ _id: feedId }, { $set: { title: meta.title } });
        console.log('// Feed title updated');
      }
    }));

    feedParser.on('error', Meteor.bindEnvironment(function (error) {
      console.log(error);
      console.log(`// ------ ERROR Parsing Feed \nFeed Id ${feedId} is causing an issue, you may want to remove it.`);
      stream.unpipe();
    }));

    feedParser.on('readable', Meteor.bindEnvironment(function () {
      let s = this, item;

      while (item = s.read()) {

        // if item has no guid, use the URL to give it one
        if (!item.guid) {
          item.guid = item.link;
        }

        // check if post already exists
        if (!!Posts.findOne({ feedItemId: item.guid })) {
          console.log('// Feed item already imported');
          continue;
        }

        newItemsCount++;
        //console.log('// New Items Count = ' + newItemsCount);
        currentUser = Users.findOne({_id: userId});
        let post = {
          title: he.decode(item.title),
          url: item.link,
          link1: item.link,
          feedId: feedId,
          feedItemId: item.guid,
          userId: currentUser._id,
          categories: self.getItemCategories(item, feedCategories)
        };

        if (item.description) {

          post.title = toMarkdown(he.decode(item.description.replace(/<(?:.|\n)*?>/gm, '')));
          // a post body cannot exceed 3000 characters
          if (post.title.length > 400)
            post.title = post.title.substring(0, 399);
        }
        
        // youtube fetch patch
        if(!post.body && item.link.indexOf('youtube') > 0) {
            post.body = toMarkdown(he.decode(item["media:group"]["media:description"]['#']));
        }

        // if RSS item link is a 301 or 302 redirect, follow the redirect
        const get = HTTP.get(item.link, {followRedirects: false});
        if (!!get.statusCode && (get.statusCode === 301 || get.statusCode === 302) &&
            !!get.headers && !!get.headers.location) {
              post.url = get.headers.location;
            }
        
        if (typeof getSetting('postByFeedDefaultStatus') === 'number') {
          post.status = getSetting('postByFeedDefaultStatus');
        }        

        // if RSS item has a date, use it
        if (item.pubdate)
          post.postedAt = moment(item.pubdate).toDate();

        try {
          //const currentUser = Users.findOne();
          newMutation({
            action: 'posts.new',
            collection: Posts,
            document: post, 
            currentUser: currentUser,
            validate: false
          });
        } catch (error) {
          // catch errors so they don't stop the loop
          console.log(error);

        }
      }

      // console.log('// Found ' + newItemsCount + ' new feed items');
    }, function (error) {
      console.log('// Failed to bind environment');
      console.log(error.stack);
      stream.unpipe();
    }, feedParser));
  }
};

export const fetchFeeds = function() {
  let contentBuffer;

  Feeds.find().forEach(function(feed) {

    // if feed doesn't specify a user, default to admin
    //const userId = !!feed.userId ? feed.userId : getFirstAdminUser()._id;
    const userId = Users.findOne({username: feed.username})._id;
    const feedCategories = feed.categories;
    const feedId = feed._id;

    try {
      contentBuffer = HTTP.get(feed.url, { responseType: 'buffer' }).content;
      feedHandler.handle(contentBuffer, userId, feedCategories, feedId);
    } catch (error) {
      console.log(error);
      return true; // just go to next feed URL
    }
  });
};

Meteor.methods({
  // this method cannot be defined in /lib/methods.js as it uses the exported function 'fetchFeeds' which is available only server-side
  'feeds.fetch'() {
    console.log("// fetching feeds…");
    fetchFeeds();
  },
});