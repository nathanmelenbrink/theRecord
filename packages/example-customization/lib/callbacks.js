
// TODO: 
// *Replace nova-voting package
// *Add functionality for flagging users 
// *Forgot password emails not sending
// *Edit Account - hide all fields except username / password, leave subscribe button (Nathan) 
// http://therecord-94654.onmodulus.net/


//import Telescope from 'meteor/nova:lib';
import moment from 'moment';
import { addCallback, Utils } from 'meteor/vulcan:core';
import { operateOnItem, getVotePower } from 'meteor/vulcan:voting';
import Users from 'meteor/vulcan:users';
import Posts from 'meteor/vulcan:posts';
// ------------------------------------- posts.new.async -------------------------------- //

/**
 * @summary Posts Rate limiting, and add karma
 */
function PostsNewRateLimit (post, user) {

  //if(!Users.isAdmin(user)){

    var timeSinceLastPost = Users.timeSinceLast(user, Posts),
      numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts),
      postInterval = 30,
      maxPostsPer24Hours = Math.round(user.karma * 0.05) + 1;

    // check that user waits more than X seconds between posts
    if(timeSinceLastPost < postInterval)
      throw new Meteor.Error(604, 'please_wait'+(postInterval-timeSinceLastPost)+'seconds_before_posting_again');

    // check that the user doesn't post more than Y posts per day
    if(numberOfPostsInPast24Hours >= maxPostsPer24Hours)
      throw new Meteor.Error(605, 'Sorry, you cannot submit more than '+maxPostsPer24Hours+' posts per 24 hours. You will be allowed more posts as your Reputation increases.');

  //}
  
  // give the user karma points
  var userId = post.userId;
  Users.update({_id: userId}, {$inc: {"karma": 10}});


  // set the post URL field to link1
  //post.url = post.link1; 
  post.link1 = Utils.addHttp(post.link1); // I had to change the addHttp function get this to work 
  post.link2 = Utils.addHttp(post.link2);
  post.link3 = Utils.addHttp(post.link3);

  return post;
}
addCallback("posts.new.sync", PostsNewRateLimit);


/**
 * @summary Posts Rate limiting, and add karma
 */
function DeletePostUpdateUser (post, user) {

  console.log("working")

  return post;
}
//addCallback("posts.remove.sync", DeletePostUpdateUser);



/**
 * @summary Update user after upvote (sync)
 */
function upvoteUpdateUser (post, user) {

    var update = {};
    //var votePower = getVotePower(user);
    var vote = {
      itemId: post._id,
      votedAt: new Date(),
      power: 1
    };

    // update user's upvoted posts list
    update.$addToSet = {'upvotedPosts': vote};
    Users.update({_id: user._id}, update);

    // update user's karma
    if (post.userId !== user._id) {
      Users.update({_id: post.userId}, {$inc: {"karma": 1}});
    }

  return post;
}
//addCallback("upvote", upvoteUpdateUser);




/**
 * @summary Update user after downvote (sync)
 */
function downvoteUpdateUser (post, user) {
  
    var update = {};
    var vote = {
      itemId: post._id,
      votedAt: new Date(),
      power: 1
    };

    // update user's downvoted posts list
    update.$addToSet = {'telescope.downvotedPosts': vote};
    Users.update({_id: user._id}, update);

    // update user's karma
    if (post.userId !== user._id) {
      Users.update({_id: post.userId}, {$inc: {"telescope.karma": -10}});
    }

  return post;
}
//addCallback("downvote", downvoteUpdateUser);


/**
 * @summary Update user after cancelled upvote (sync)
 */
function cancelUpvoteUpdateUser (post, user) {

  var update = {};
  var vote = {
    itemId: post._id,
    votedAt: new Date(),
    power: 1
  };

  // update user's upvoted posts list
  update.$pull = {'telescope.upvotedPosts': {itemId: post._id}};
  Users.update({_id: user._id}, update);

  // update user's karma
  if (post.userId !== user._id) {
    Users.update({_id: post.userId}, {$inc: {"telescope.karma": -1}});
  }

  return post;

}

//addCallback("cancelUpvote", cancelUpvoteUpdateUser);


/**
 * @summary Update user after cancelled downvote (sync)
 */
function cancelDownvoteUpdateUser (post, user) {

  var update = {};
  var vote = {
    itemId: post._id,
    votedAt: new Date(),
    power: 1
  };

  // update user's downvoted posts list
  update.$pull = {'telescope.downvotedPosts': {itemId: post._id}};
  Users.update({_id: user._id}, update);

  // update post author's karma
  if (post.userId !== user._id) {
    Users.update({_id: post.userId}, {$inc: {"telescope.karma": 10}});
  }


  return post;

}

//addCallback("cancelDownvote", cancelDownvoteUpdateUser);

// Telescope.callbacks.remove("upvote.async", updateUser);
// Telescope.callbacks.remove("downvote.async", updateUser);
// Telescope.callbacks.remove("cancelUpvote.async", updateUser);
// Telescope.callbacks.remove("cancelDownvote.async", updateUser);

