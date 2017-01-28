
// Had to remove the updateUser callbacks from the core/lib, it won't remove them from this file

// Check console for server errors, cancelUV and DV are called from server, not sure if we keep this? 
// Cancel upvote needs to return vote back to user

// Posts collection is working, users is not

// TODO: 
// _Increase karma after posting
// _Prevent users from exceeding posts per 24 hours
// _Prevent users from exceeding votes per 24 hours
// _Prevent users from exceeding flags per 24 hours
// _Build flags with "downvote" functionality
// _Decrease karma if post has been flagged
// _remove comments after posts
// *Replace nova-voting package
// *Fix ranking algorithm
// *Make daily allotments cumulative? Maybe not? Rounding up for now
// *Add functionality for flagging users 
// *Make post fields required
// *Add categories 

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

      //console.log(maxPostsPer24Hours);
      //console.log(numberOfUpvotesInPast24Hours);

    // check that user waits more than X seconds between posts
    if(timeSinceLastPost < postInterval)
      throw new Meteor.Error(604, 'please_wait'+(postInterval-timeSinceLastPost)+'seconds_before_posting_again');

    // check that the user doesn't post more than Y posts per day
    if(numberOfPostsInPast24Hours >= maxPostsPer24Hours)
      throw new Meteor.Error(605, 'sorry_you_cannot_submit_more_than'+maxPostsPer24Hours+'posts_per_day');

  //}
  
  // give the user karma points
  var userId = post.userId;
  Users.update({_id: userId}, {$inc: {"telescope.karma": 10}});

  return post;
}
Telescope.callbacks.add("posts.new.method", PostsNewRateLimit);


/**
 * @summary Upvotes Rate limiting
 */
function UpvotesNewRateLimit (post, user) {
	 
    //console.log("votin")
  	// function numberOfUpvotesInPast24Hours (user){
	  // 	var mNow = moment();
	  // 	var items = 0;

	  // 	user.telescope.upvotedPosts.forEach(function (entry){	
	  // 		if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
	  // 	});

		 //  return items;
	  //  }

   //  var maxUpvotesPer24Hours = Math.ceil(user.telescope.karma * 0.2);

   //  // it doesn't want to let me throw this meteor error, need to fix that
   //  // but at least it prevents upvotes

   //  if(numberOfUpvotesInPast24Hours(user) >= maxUpvotesPer24Hours){
   //    console.log("denied");
   //    //throw new Meteor.Error(607, 'sorry_you_cannot_submit_more_than'+maxUpvotesPer24Hours+'upvotes_per_day');
   //  } else {
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

        // update post's list of users
        //update = {
        //  $addToSet: {upvoters: user._id},
        //  $inc: {upvotes: 1, baseScore: 1}
        //}

        //update["$set"] = {inactive: false};
        //var result = Posts.update({_id: post._id}, update);
    //}

  return post;
}
Telescope.callbacks.add("upvote", UpvotesNewRateLimit);




/**
 * @summary Downvotes (flags) Rate limiting
 */
function DownvotesNewRateLimit (post, user) {
	
  	// function numberOfDownvotesInPast24Hours (user){
	  // 	var mNow = moment();
	  // 	var items = 0;

	  // 	user.telescope.downvotedPosts.forEach(function (entry){	
	  // 		if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
	  // 	});

		 //  return items;
	  // }

   //  var maxDownvotesPer24Hours = Math.ceil(user.telescope.karma * 0.01);

   //  if(numberOfDownvotesInPast24Hours(user) >= maxDownvotesPer24Hours){
   //    //console.log("denied");
   //  } else {
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

        // update post's list of users
        //update = {
        //  $addToSet: {downvoters: user._id},
        //  $inc: {downvotes: 1, baseScore: -10}
        //}

        //update["$set"] = {inactive: false};
        //var result = Posts.update({_id: post._id}, update);
    //s}

  return post;
}
Telescope.callbacks.add("downvote", DownvotesNewRateLimit);


/**
 * @summary Cancel upvotes 
 * doesn't get called unless CustomVote.jsx calls it
 */
function cancelUpvoteSync (post, user) {

  console.log ("cancel uv function")
  console.log (user)
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
  console.log (user)
  // update post's list of users
  //update = {
  //  $pull: {upvoters: user._id},
  //  $inc: {upvotes: -1, baseScore: -1}
  //}

  //update["$set"] = {inactive: false};
  //var result = Posts.update({_id: post._id}, update);

  return post;

}

Telescope.callbacks.add("cancelUpvote", cancelUpvoteSync);


/**
 * @summary Cancel downvotes (flags) 
 * doesn't get called unless Flag.jsx calls it
 */
function cancelDownvoteSync (post, user) {

  console.log ("cancel dv function")
  console.log (user)
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

console.log (user)
  // update post's list of users
  //update = {
  //  $pull: {downvoters: user._id},
  //  $inc: {downvotes: -1, baseScore: 10}
  //}

  //update["$set"] = {inactive: false};
  //var result = Posts.update({_id: post._id}, update);

  return post;

}

Telescope.callbacks.add("cancelDownvote", cancelDownvoteSync);

// Telescope.callbacks.remove("upvote.async", updateUser);
// Telescope.callbacks.remove("downvote.async", updateUser);
// Telescope.callbacks.remove("cancelUpvote.async", updateUser);
// Telescope.callbacks.remove("cancelDownvote.async", updateUser);


