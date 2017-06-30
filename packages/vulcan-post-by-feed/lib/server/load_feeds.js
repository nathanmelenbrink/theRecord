import { getFirstAdminUser } from './fetch_feeds';
import Categories from 'meteor/vulcan:categories';
import Feeds from '../collection.js';
import Users from 'meteor/vulcan:users';
import Posts from 'meteor/vulcan:posts';
import moment from 'moment'; 
// Load feeds from settings, if there are any
Meteor.startup(() => {
  // clear the Feeds collection
  Feeds.remove({});

  // temporary code to remove posts with absent users
  // Posts.find({
  //   createdAt: {
  //       $gte: new Date(Date.now() - 72*60*60 * 1000),
  //   }
  // }).forEach(function(post) {
  //     return Posts.remove({_id: post._id})
  // });

  if (Meteor.settings && Meteor.settings.feeds) {
    Meteor.settings.feeds.forEach(feed => {
      // look for existing feed with same url
      let existingFeed = Feeds.findOne({url: feed.url});

      // todo: accept more than one category
      if (feed.categorySlug) {
        const category = Categories.findOne({ slug: feed.categorySlug });
        feed.categories = [category._id];
      }

      if (existingFeed) {
        // if feed exists, update it with settings data except url
        delete feed.url;

        Feeds.update(existingFeed._id, {$set: feed});
      } else {
        // if not, create it only if there is an admin user
        if (!feed.userId) {
          //const firstAdminUser = getFirstAdminUser();
          const feedUser = Users.findOne({username: feed.username});
          if (typeof feedUser !== 'undefined') {
            feed.userId = feedUser._id;
          } else {
            console.log('// No userId defined and no admin found, cannot create feed');
          }
        }

        feed.createdFromSettings = true;

        Feeds.insert(feed);
        console.log(`// Creating feed “${feed.url}”`);
      }
    });
  }
});
