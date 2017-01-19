
import Telescope from 'meteor/nova:lib';

// ------------------------------------- posts.new.async -------------------------------- //

/**
 * @summary Increment the user's post count
 */
function PostsNewIncrementPostCount (post) {
  var userId = post.userId;
  Users.update({_id: userId}, {$inc: {"telescope.postCount": 1}});
}
Telescope.callbacks.add("posts.new.async", PostsNewIncrementPostCount);

// /**
//  * @summary Make users upvote their own new posts
//  */
// function PostsNewUpvoteOwnPost (post) {
//   if (typeof Telescope.operateOnItem !== "undefined") {
//     var postAuthor = Users.findOne(post.userId);
//     Telescope.operateOnItem(Posts, post._id, postAuthor, "upvote");
//   }
// }
// Telescope.callbacks.add("posts.new.async", PostsNewUpvoteOwnPost);

/**
 * @summary Increment the user's karma after posting
 */
function PostsNewIncrementKarma (post) {
  var userId = post.userId;
  Users.update({_id: userId}, {$inc: {"telescope.karma": 10}});
}
Telescope.callbacks.add("posts.new.async", PostsNewIncrementKarma);


/**
 * @summary Check if a user has upvoted a document
 * @param {Object} user
 * @param {Object} document
 */
//Users.hasRated = function (user, document) {
//  return user && _.include(document.raters, user._id);
//};
//Users.helpers({hasRated: function (document) {return Users.hasRated(this, document);}});

/**
 * @summary Update the karma of the item's owner
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */



