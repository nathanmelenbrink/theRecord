
import Posts from "meteor/vulcan:posts";
import Users from 'meteor/vulcan:users';
import moment from 'moment';

import { Components, replaceComponent, getRawComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const CustomUsersProfile = (props) => {

  console.log(props);
  //const twitterName = Users.getTwitterName(user);


  const terms = {view:"userPosts", userId: user._id};
  const {selector, options} = Posts.parameters.get(terms);

  const numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts);
  const numberOfVotesInPast24Hours = numberOfUpvotesInPast24Hours(user);//Users.numberOfItemsInPast24Hours(user, Upvotes);
  const numberOfFlagsInPast24Hours = numberOfDownvotesInPast24Hours(user); //Users.numberOfItemsInPast24Hours(user, Flags);

  const postsPerDay = Math.round(user.telescope.karma * 0.05) + 1;
  const votesPerDay = Math.ceil(user.telescope.karma * 0.05) + 5;
  const flagsPerDay = Math.ceil(user.telescope.karma * 0.01);
  
  const remainingPosts = postsPerDay - numberOfPostsInPast24Hours;
  const remainingVotes = votesPerDay - numberOfVotesInPast24Hours;
  const remainingFlags = flagsPerDay - numberOfFlagsInPast24Hours;

  //const mNow = moment();
  // these should be helper functions in the User object, but how do you do that?
  function numberOfUpvotesInPast24Hours (user){
    
    var items = 0;

    user.telescope.upvotedPosts.forEach(function (entry){ 
      var mNow = moment();
      if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
    });

  return items;
  }

  function numberOfDownvotesInPast24Hours (user){
      
      var items = 0;

      user.telescope.downvotedPosts.forEach(function (entry){ 
        var mNow = moment();
        if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
      });

    return items;
  }
  
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    
      const user = props.document;
    const terms = {view: "userPosts", userId: user._id};

  return (
    <div className="page users-profile">
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        <h2 className="page-title">{Users.getDisplayName(user)}</h2>
        {user.htmlBio ? <div dangerouslySetInnerHTML={{__html: user.htmlBio}}></div> : null }
        <ul>
          {user.twitterUsername ? <li><a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
          {user.website ? <li><a href={user.website}>{user.website}</a></li> : null }
          <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
            <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li>
          </Components.ShowIf>
        </ul>
        <h3><FormattedMessage id="users.posts"/></h3>
        <Components.PostsList terms={terms} />
      </div>  )
}
}

CustomUsersProfile.propTypes = {
  //user: React.PropTypes.object.isRequired,
}


CustomUsersProfile.displayName = "UsersProfile";


const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

//replaceComponent('UsersProfile', CustomUsersProfile, withCurrentUser, [withDocument, options]);