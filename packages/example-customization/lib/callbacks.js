
// TODO: 
// Add error message when exceeding upvotes/flags per day
// *Replace nova-voting package
// *Add functionality for flagging users 
// *Forgot password emails not sending
// *Edit Account - hide all fields except username / password, leave subscribe button (Nathan) 
// Scale back reputations to 100
// Trim RSS feeds to sentences 
// Verify points functionality 
// Add locations 


//import Telescope from 'meteor/nova:lib';
import moment from 'moment';
import { addCallback, removeCallback, Utils } from 'meteor/vulcan:core';
import { operateOnItem, getVotePower } from 'meteor/vulcan:voting';
import Users from 'meteor/vulcan:users';
import Posts from 'meteor/vulcan:posts';
// ------------------------------------- posts.new.async -------------------------------- //



//removeCallback('posts.new.validate', "PostsNewRateLimit");

/**
 * @summary Posts Rate limiting, and add karma
 */
 function PostsNewRateLimit (post, user) {

  //if(!Users.isAdmin(user)){

    var timeSinceLastPost = Users.timeSinceLast(user, Posts),
      numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts),
      postInterval = 30,
      maxPostsPer24Hours = Math.ceil(user.karma * 0.01) + 1;

    if(timeSinceLastPost < postInterval)
      throw new Meteor.Error(604, 'please_wait'+(postInterval-timeSinceLastPost)+'seconds_before_posting_again');
      //throw new Error(Utils.encodeIntlError({id: "posts.rate_limit_error", value: postInterval-timeSinceLastPost}));

    // check that the user doesn't post more than Y posts per day
    if(numberOfPostsInPast24Hours >= maxPostsPer24Hours){
       console.log("trying to throw error ");
       throw new Meteor.Error(605, 'Sorry, you cannot submit more than '+maxPostsPer24Hours+' posts per 24 hours. You will be allowed more posts as your Reputation increases.');

      //throw new Error(Utils.encodeIntlError({id: "posts.max_per_day", value: maxPostsPer24Hours}));
    }

    console.log("nm posts 24 hr: " + numberOfPostsInPast24Hours);
    
  //}
  
  // set the post URL field to link1
  //post.url = post.link1; 
  post.link1 = Utils.addHttp(post.link1); // I had to change the addHttp function get this to work 
  post.link2 = Utils.addHttp(post.link2);
  post.link3 = Utils.addHttp(post.link3);

  return post;
}
addCallback("posts.new.validate", PostsNewRateLimit);

// function CustomPostsNewRateLimit (post, user) {

//   //if(!Users.isAdmin(user)){

//     var timeSinceLastPost = Users.timeSinceLast(user, Posts),
//       numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts),
//       postInterval = 30,
//       maxPostsPer24Hours = Math.round(user.karma * 0.01) + 1;

//     // check that user waits more than X seconds between posts
//     // if(timeSinceLastPost < postInterval)
//     //  throw new Meteor.Error(604, 'please_wait'+(postInterval-timeSinceLastPost)+'seconds_before_posting_again');

//     console.log("num posts past 24 = " + numberOfPostsInPast24Hours);
//     // check that the user doesn't post more than Y posts per day
//     if(numberOfPostsInPast24Hours >= maxPostsPer24Hours)
//       throw new Error(Utils.encodeIntlError({id: "posts.max_per_day", value: maxPostsPer24Hours}));
//       //throw new Meteor.Error(605, 'Sorry, you cannot submit more than '+maxPostsPer24Hours+' posts per 24 hours. You will be allowed more posts as your Reputation increases.');

//   //}

//   // set the post URL field to link1
//   //post.url = post.link1; 
//   post.link1 = Utils.addHttp(post.link1); // I had to change the addHttp function get this to work 
//   post.link2 = Utils.addHttp(post.link2);
//   post.link3 = Utils.addHttp(post.link3);

//   return post;
// }
//addCallback("posts.new.validate", CustomPostsNewRateLimit);

/**
 * @summary Upvotes Rate limiting
 */
function UpvotesNewRateLimit (post, user) {

    var numberOfUpvotesInPast24Hours = 0;
    var mNow = moment();
    mNow.subtract(24, 'hours').toDate();
    //console.log(user);
    user.upvotedPosts.forEach(function (entry){ 
      //console.log(entry.votedAt); 
      if(mNow.isSameOrBefore(entry.votedAt)){ 
        //console.log(entry.votedAt); 
        //console.log(mNow._d); 
        numberOfUpvotesInPast24Hours++; 
      }
    });
     
   // var numberOfUpvotesInPast24Hours = Users.numberOfUpvotesInPast24Hours(user),
    var maxUpvotesPer24Hours = Math.ceil(user.karma * 0.02) + 5;

    //console.log(numberOfUpvotesInPast24Hours);
    // check that the user doesn't post more than Y posts per day
    if(numberOfUpvotesInPast24Hours >= maxUpvotesPer24Hours)
      console.log("throw error here");
      //throw new Error(Utils.encodeIntlError({id: "posts.max_per_day", value: maxUpvotesPer24Hours}));
      //throw new Error(Utils.encodeIntlError({id: `app.mutation_not_allowed`, value: numberOfUpvotesInPast24Hours on _id: "${document._id}"`}})
     //throw new Meteor.Error(605, 'Sorry, you cannot submit more than '+maxUpvotesPer24Hours+' upvotes per 24 hours. You will be allowed more posts as your Reputation increases.');
      //this.context.messages.flash("Please log in first");
       //post.props.flash("Sorry, you cannot upvote more than " +maxUpvotesPer24Hours+ " posts within a 24 hour period. Try creating a new post to increase your Reputation.");
        //  throw new Error({id: 'categories.invalid'});


  return post;
}
addCallback("upvote", UpvotesNewRateLimit);


/**
 * @summary Posts Rate limiting, and add karma
 */
function DeletePostUpdateUser (post, user) {

  console.log("working")

  return post;
}
addCallback("posts.edit.sync", DeletePostUpdateUser);


