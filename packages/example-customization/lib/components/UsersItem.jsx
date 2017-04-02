/* 

An item in the movies list.
Wrapped with the "withCurrentUser" container.

*/

import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';

//////////////////////////////////////////////////////
// User                                             //
//////////////////////////////////////////////////////

//class Leader extends Component {
const UserItem = ({user, currentUser}) =>
 
  <div key={user.username} style={{paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
    <div > <Link to={Users.getProfileUrl(user, false)} target={Users.getProfileUrl(user, false)}>
      {user.username}:

    </Link>  &nbsp;{user.telescope.karma}</div>
  </div>

export default UserItem;