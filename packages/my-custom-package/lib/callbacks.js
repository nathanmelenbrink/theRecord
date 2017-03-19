
// Had to remove the updateUser callbacks from the core/lib, it won't remove them from this file


// TODO: 
// *Replace nova-voting package
// *Add functionality for flagging users 
// *Forgot password emails not sending
// *Edit Account - hide all fields except username / password, leave subscribe button (Nathan) 


import Telescope from 'meteor/nova:lib';
import moment from 'moment';

// ------------------------------------- posts.new.async -------------------------------- //

/**
 * @summary Posts Rate limiting, and add karma
 */
function PostsNewRateLimit (post, user) {

  //if(!Users.isAdmin(user)){

    var timeSinceLastPost = Users.timeSinceLast(user, Posts),
      numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts),
      postInterval = Math.abs(parseInt(Telescope.settings.get('postInterval', 30))),
      maxPostsPer24Hours = Math.round(user.telescope.karma * 0.05) + 1;

    // check that user waits more than X seconds between posts
    if(timeSinceLastPost < postInterval)
      throw new Meteor.Error(604, 'please_wait'+(postInterval-timeSinceLastPost)+'seconds_before_posting_again');

    // check that the user doesn't post more than Y posts per day
    if(numberOfPostsInPast24Hours >= maxPostsPer24Hours)
      throw new Meteor.Error(605, 'Sorry, you cannot submit more than '+maxPostsPer24Hours+' posts per 24 hours. You will be allowed more posts as your Reputation increases.');

  //}
  
  // give the user karma points
  var userId = post.userId;
  Users.update({_id: userId}, {$inc: {"telescope.karma": 10}});

  return post;
}
Telescope.callbacks.add("posts.new.method", PostsNewRateLimit);


/**
 * @summary Posts Rate limiting, and add karma
 */
function DeletePostUpdateUser (post, user) {

  console.log("working")

  return post;
}
Telescope.callbacks.add("posts.remove.sync", DeletePostUpdateUser);



/**
 * @summary Update user after upvote (sync)
 */
function upvoteUpdateUser (post, user) {

    var update = {};
    var votePower = Telescope.getVotePower(user);
    var vote = {
      itemId: post._id,
      votedAt: new Date(),
      power: votePower
    };

    // update user's upvoted posts list
    update.$addToSet = {'telescope.upvotedPosts': vote};
    Users.update({_id: user._id}, update);

    // update user's karma
    if (post.userId !== user._id) {
      Users.update({_id: post.userId}, {$inc: {"telescope.karma": 1}});
    }

  return post;
}
Telescope.callbacks.add("upvote", upvoteUpdateUser);




/**
 * @summary Update user after downvote (sync)
 */
function downvoteUpdateUser (post, user) {
  
    var update = {};
    var votePower = Telescope.getVotePower(user);
    var vote = {
      itemId: post._id,
      votedAt: new Date(),
      power: votePower
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
Telescope.callbacks.add("downvote", downvoteUpdateUser);


/**
 * @summary Update user after cancelled upvote (sync)
 */
function cancelUpvoteUpdateUser (post, user) {

  var update = {};
  var votePower = Telescope.getVotePower(user);
  var vote = {
    itemId: post._id,
    votedAt: new Date(),
    power: votePower
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

Telescope.callbacks.add("cancelUpvote", cancelUpvoteUpdateUser);


/**
 * @summary Update user after cancelled downvote (sync)
 */
function cancelDownvoteUpdateUser (post, user) {

  var update = {};
  var votePower = Telescope.getVotePower(user);
  var vote = {
    itemId: post._id,
    votedAt: new Date(),
    power: votePower
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

Telescope.callbacks.add("cancelDownvote", cancelDownvoteUpdateUser);

// Telescope.callbacks.remove("upvote.async", updateUser);
// Telescope.callbacks.remove("downvote.async", updateUser);
// Telescope.callbacks.remove("cancelUpvote.async", updateUser);
// Telescope.callbacks.remove("cancelDownvote.async", updateUser);