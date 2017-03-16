import Telescope from 'meteor/nova:lib';
//import React from 'react';
import Users from 'meteor/nova:users';
import { FormattedMessage } from 'react-intl';
import { ListContainer } from "meteor/utilities:react-list-container";
import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/nova:core';

const Leaderboard = () => {

  //const terms = {view:"userPosts", userId: user._id};
  //const {selector, options} = Posts.parameters.get(terms);

  // Posts.views.add("new", function (terms) {
  // return {
  //   options: {sort: {sticky: -1, postedAt: -1}}
  //   };
  // });



}

Leaderboard.propTypes = {
  user: React.PropTypes.object.isRequired,
}

Leaderboard.contextTypes = {
  currentUser: React.PropTypes.object
}
//registerComponent('Leaderboard', Leaderboard);
export default Leaderboard;

       // <ListContainer
       //   collection={Users}
       //   publication="users.list"
       //   terms={{options: {sort: {createdAt: -1}}}}
       //   joins={Users.getJoins()}
       //   cacheSubscription={false}
       //   component={Telescope.components.UsersList}
       //   componentProps={{showHeader: false}}
       // listId="posts.list.user"
       // />