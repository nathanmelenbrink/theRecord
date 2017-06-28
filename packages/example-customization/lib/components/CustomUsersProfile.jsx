
import Posts from "meteor/vulcan:posts";
import Users from 'meteor/vulcan:users';
import moment from 'moment';

import { Components, replaceComponent, getRawComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage} from 'meteor/vulcan:i18n';
import { Link } from 'react-router';

const CustomUsersProfile = (props) => {

    
    if (props.loading) {

      return <div className="page users-profile"><Components.Loading/></div>

    } else if (!props.document) {

      console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
      return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
    
    } else {

    
    const user = props.document;
    const terms = {view: "userPosts", userId: user._id};

    function numberOfUpvotesInPast24Hours (user){
       var items = 0;
       var mNow = moment();
       mNow.subtract(24, 'hours').toDate();

       user.upvotedPosts.forEach(function (entry){ 
         if(mNow.isSameOrBefore(entry.votedAt)){ items++;}
       });

       return items;
   }

   function numberOfDownvotesInPast24Hours (user){
       var items = 0;
       var mNow = moment();
       mNow.subtract(24, 'hours').toDate();

       user.downvotedPosts.forEach(function (entry){ 
         if(mNow.isSameOrBefore(entry.votedAt)){ items++;}
       });

       return items;
   }

    const numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts);
    const numberOfVotesInPast24Hours = numberOfUpvotesInPast24Hours(user);//Users.numberOfItemsInPast24Hours(user, Upvotes);
    const numberOfFlagsInPast24Hours = numberOfDownvotesInPast24Hours(user); //Users.numberOfItemsInPast24Hours(user, Flags);

    const postsPerDay = Math.round(user.karma * 0.01) + 1;
    const votesPerDay = Math.ceil(user.karma * 0.02) + 5;
    const flagsPerDay = Math.ceil(user.karma * 0.01);
    
    const remainingPosts = postsPerDay - numberOfPostsInPast24Hours;
    const remainingVotes = votesPerDay - numberOfVotesInPast24Hours;
    const remainingFlags = flagsPerDay - numberOfFlagsInPast24Hours;

    return (
    <div className="page users-profile">
    <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)}  />
      <h2 className="page-title">{Users.getDisplayName(user)}</h2>
      <p className="page-title">
      Reputation = {user.karma} &nbsp;
      Post Count = {user.postCount} &nbsp;
      Posts per day = {postsPerDay} &nbsp;
      Upvotes per day = {votesPerDay} &nbsp;
      Flags per day = {flagsPerDay} </p>

       <p className="page-title">
       Remaining Posts: {remainingPosts}  &nbsp;
       Remaining Votes: {remainingVotes}  &nbsp;
       Remaining Flags: {remainingFlags}  &nbsp;
       </p>

       <ul>
      <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
         <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li>
      </Components.ShowIf>
        </ul>
        <h3><FormattedMessage id="users.posts"/></h3>
        <Components.PostsList terms={terms} />
      </div>  

      )
}
}

CustomUsersProfile.propTypes = {
  //document: React.PropTypes.object.isRequired,
}


CustomUsersProfile.displayName = "UsersProfile";


const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

replaceComponent('UsersProfile', CustomUsersProfile, withCurrentUser, [withDocument, options]);