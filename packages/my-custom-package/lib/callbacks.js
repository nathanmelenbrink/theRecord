// Flagging is stored as downvotes, need to change weighting and add callback


// TODO: 
// _Increase karma after posting
// _Prevent users from exceeding posts per 24 hours
// _Prevent users from exceeding votes per 24 hours
// *Prevent users from exceeding flags per 24 hours
// *Build flags with "downvote" functionality
// *Add flags and flaggers fields to post schema  
// *Decrease karma if post has been flagged
// *Fix ranking algorithm
// *Make daily allotments cumulative? Maybe not? Rounding up for now
// *Add functionality for flagging users 

import Telescope from 'meteor/nova:lib';
import moment from 'moment';

// ------------------------------------- posts.new.async -------------------------------- //


/**
 * @summary Increment the user's karma after posting
 */
function PostsNewIncrementKarma (post) {
  var userId = post.userId;
  Users.update({_id: userId}, {$inc: {"telescope.karma": 10}});
  
}
Telescope.callbacks.add("posts.new.async", PostsNewIncrementKarma);

// TODO: remove karma points if user removes post
// posts being upvoted already increases author's karma

/**
 * @summary Decrease the user's votes after voting 
 */
// function VoteDecreaseVotes (user) {
//   var userId = user._id;
//   Users.update({_id: userId}, {$inc: {"telescope.remainingVotes": -1}});
// }
// Telescope.callbacks.add("upvote.sync", VoteDecreaseVotes);

/**
 * @summary Increase the user's votes after canceled voting
 */
// function CancelVoteIncreaseVotes (post) {
//   var userId = post.userId;
//   Users.update({_id: userId}, {$inc: {"telescope.remainingVotes": 1}});
// }
// Telescope.callbacks.add("cancelUpvote.async", CancelVoteIncreaseVotes);


/**
 * @summary Posts Rate limiting
 */
function PostsNewRateLimit (post, user) {

  if(!Users.isAdmin(user)){

    var timeSinceLastPost = Users.timeSinceLast(user, Posts),
      numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts),
      postInterval = Math.abs(parseInt(Telescope.settings.get('postInterval', 30))),
      maxPostsPer24Hours = Math.ceil(user.telescope.karma * 0.05);

      //console.log(maxPostsPer24Hours);
      //console.log(numberOfUpvotesInPast24Hours);

    // check that user waits more than X seconds between posts
    if(timeSinceLastPost < postInterval)
      throw new Meteor.Error(604, 'please_wait'+(postInterval-timeSinceLastPost)+'seconds_before_posting_again');

    // check that the user doesn't post more than Y posts per day
    if(numberOfPostsInPast24Hours > maxPostsPer24Hours)
      throw new Meteor.Error(605, 'sorry_you_cannot_submit_more_than'+maxPostsPer24Hours+'posts_per_day');

  }

  function numberOfUpvotesInPast24Hours (user){
  	var mNow = moment();
  	var items = 0;

  	user.telescope.upvotedPosts.forEach(function (entry){	
  		if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
  	});

	return items;
  }

  return post;
}
Telescope.callbacks.add("posts.new.method", PostsNewRateLimit);


/**
 * @summary Upvotes Rate limiting
 */
function UpvotesNewRateLimit (post, user) {

  if(!Users.isAdmin(user)){
	
  	function numberOfUpvotesInPast24Hours (user){
	  	var mNow = moment();
	  	var items = 0;

	  	user.telescope.upvotedPosts.forEach(function (entry){	
	  		if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
	  	});

		return items;
	}

    var maxUpvotesPer24Hours = Math.ceil(user.telescope.karma * 0.05);

    // check that the user doesn't post more than Y posts per day
    // it doesn't want to let me throw this meteor error, need to fix that
    // but at least it prevents upvotes

    if(numberOfUpvotesInPast24Hours(user) > maxUpvotesPer24Hours)
      throw new Meteor.Error(607, 'sorry_you_cannot_submit_more_than'+maxUpvotesPer24Hours+'upvotes_per_day');

  }
  return user;
}
Telescope.callbacks.add("upvote", UpvotesNewRateLimit);




