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

  Posts.find({
    // condition #1: users created since variable ago
    createdAt: {
        $gte: new Date(Date.now() - 2*60*60 * 1000),
    }
  }).forEach(function(post) {
    //console.log(post.createdAt);
      return Posts.remove({_id: post._id})
  });

  // Posts.find({$query: {}, $orderby: {$createdAt : -1}}).limit(1).forEach(function(post){
  //   console.log('sorted post: ');
  //   console.log(post);
  //   return Posts.remove({_id: post._id})
  // });

   //Posts.remove({ createdAt: { $gte: new Date(Date.now() - 4*60*60 * 1000) } });

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
