import { Components, registerComponent, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

const CustomUsersMenu = ({currentUser, client}) =>
  <div className="users-menu">
    <Dropdown id="user-dropdown">
      <Dropdown.Toggle>
        
        <div className="users-menu-name">{Users.getDisplayName(currentUser)}</div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LinkContainer to={`/users/${currentUser.slug}`}>
          <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
        </LinkContainer>
        <LinkContainer to={`/account`}>
          <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
        </LinkContainer>
        <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  </div>


CustomUsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

replaceComponent('UsersMenu', CustomUsersMenu, withCurrentUser, withApollo);