import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/std:accounts-ui';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/nova:users';
// <Telescope.components.UsersAvatar size="small" user={currentUser} link={false} />

class CustomUsersMenu extends Telescope.components.UsersMenu {

  render() {

    const {currentUser} = this.context;

    return (
      <div className="users-menu">
        <Dropdown id="user-dropdown">
          <Dropdown.Toggle>
            
            <div>{Users.getDisplayName(currentUser)}</div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <LinkContainer to={`/users/${currentUser.telescope.slug}`}>
              <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
            </LinkContainer>
            <LinkContainer to={`/account`}>
              <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
            </LinkContainer>
            <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(Accounts.ui._options.onSignedOutHook())}><FormattedMessage id="users.log_out"/></MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    ) 
  }

}

CustomUsersMenu.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object
}

module.exports = CustomUsersMenu;
export default CustomUsersMenu;