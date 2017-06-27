import { Components, replaceComponent, getRawComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage} from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
// <Telescope.components.UsersAvatar size="small" user={currentUser} link={false} />

class CustomUsersMenu extends getRawComponent('UsersMenu') {

  render() {

     const {currentUser, client} = this.props;

    return (
      <div className="users-menu">
        <Dropdown id="user-dropdown">
          <Dropdown.Toggle>
            
            <div>{Users.getDisplayName(currentUser)}</div>
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
    ) 
  }

}

CustomUsersMenu.propsTypes = {
  currentUser: React.PropTypes.object,
  client: React.PropTypes.object,
};

//replaceComponent('UsersMenu', CustomUsersMenu, withCurrentUser, withApollo);