/*
Let's add a callback to the new post method that
appends a random emoji to the newly submitted post's title.
*/

import Telescope from 'meteor/nova:lib';

// ------------------------------------- posts.new.async -------------------------------- //

/**
 * @summary Increment the user's post count
 */
// function PostsNewIncrementPostCount (post) {
//   var userId = post.userId;
//   Users.update({_id: userId}, {$inc: {"telescope.postCount": 1}});
// }
// Telescope.callbacks.add("posts.new.async", PostsNewIncrementPostCount);

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
 * @summary Check if a user has upvoted a document
 * @param {Object} user
 * @param {Object} document
 */
//Users.hasRated = function (user, document) {
//  return user && _.include(document.raters, user._id);
//};
//Users.helpers({hasRated: function (document) {return Users.hasRated(this, document);}});




function PostsNewAddRandomEmoji (post, user) {

  //post.title = post.title + " " +_.sample(["🎉", "💎", "☠", "⏱", "🎈", "⛱"])

  return post;
}
Telescope.callbacks.add("posts.new.sync", PostsNewAddRandomEmoji);
