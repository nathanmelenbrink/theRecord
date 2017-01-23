import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { ListContainer } from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import { Link } from 'react-router';

const UsersProfile = ({user}, {currentUser}) => {

  const twitterName = Users.getTwitterName(user);

  const terms = {view:"userPosts", userId: user._id};
  const {selector, options} = Posts.parameters.get(terms);

  const numberOfPostsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Posts);
  const numberOfVotesInPast24Hours = 4; //Users.numberOfItemsInPast24Hours(user, Upvotes);
  const numberOfFlagsInPast24Hours = 1; //Users.numberOfItemsInPast24Hours(user, Flags);

  const postsPerDay = Math.ceil(user.telescope.karma * 0.05);
  const votesPerDay = Math.ceil(user.telescope.karma * 0.1);
  const flagsPerDay = Math.ceil(user.telescope.karma * 0.01);
  
  const remainingPosts = postsPerDay - numberOfPostsInPast24Hours;
  const remainingVotes = votesPerDay - numberOfVotesInPast24Hours;
  const remainingFlags = flagsPerDay - numberOfFlagsInPast24Hours;


  return (
    <div className="page users-profile">
      {/* don't know why this suddenly started causing errors 
    <Telescope.components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} description={} />*/}
      <h2 className="page-title">{Users.getDisplayName(user)}</h2>
      <p className="page-title">
      Reputation = {user.telescope.karma} &nbsp;
      Post Count = {user.telescope.postCount} &nbsp;
      Posts per day = {postsPerDay} &nbsp;
      Upvotes per day = {votesPerDay} &nbsp;
      Flags per day = {flagsPerDay} </p>

       <p className="page-title">
       Remaining Posts: {remainingPosts}  &nbsp;
       Remaining Votes: {remainingVotes}  &nbsp;
       Remaining Flags: {remainingFlags}  &nbsp;
       </p>

      <p>{user.telescope.bio}</p>
      <ul>
        {twitterName ? <li><a href={"http://twitter.com/" + twitterName}>@{twitterName}</a></li> : null }
        {user.telescope.website ? <li><a href={user.telescope.website}>{user.telescope.website}</a></li> : null }
        <Telescope.components.CanDo document={user} action="users.edit">
          <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li>
        </Telescope.components.CanDo>
      </ul>
      <h3><FormattedMessage id="users.posts"/></h3>
      <ListContainer
        collection={Posts}
        publication="posts.list"
        terms={terms}
        selector={selector}
        options={options}
        joins={Posts.getJoins()}
        cacheSubscription={false}
        component={Telescope.components.PostsList}
        componentProps={{showHeader: false}}
        listId="posts.list.user"
      />
    </div>
  )
}

UsersProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
}

UsersProfile.contextTypes = {
  currentUser: React.PropTypes.object
}

UsersProfile.displayName = "UsersProfile";

module.exports = UsersProfile;