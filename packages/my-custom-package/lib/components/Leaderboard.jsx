
import Telescope from 'meteor/nova:lib';
//import React from 'react';
import Users from 'meteor/nova:users';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import React, { PropTypes, Component } from 'react';
import { ListContainer } from "meteor/utilities:react-list-container";
import NovaForm from "meteor/nova:forms";
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/std:accounts-ui';
import { ModalTrigger, /* Messages, */ FlashContainer } from "meteor/nova:core";

class Leaderboard extends Component {
  render() {
      return (
        <div className="wrapper">

          <div className="main">

            <ListContainer
              collection={Users}
              publication="users.list"
              terms={{options: {sort: {'telescope.karma': -1}}}}
              options={{sort: {'telescope.karma': -1}}}
              joins={Users.getJoins()}
              limit={10}
              component={UsersList}
              listId="users.list"
            />
          </div>

        </div>
      )
    }
}

//////////////////////////////////////////////////////
// MoviesList                                       //
//////////////////////////////////////////////////////

class UsersList extends Component {


  render() {

    return (
      <div className="users">
     <div  style={{paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
  
        <h3>Leaderboard</h3>
    </div>
        {this.props.results.map(user => <Leader key={user._id} {...user} currentUser={this.props.currentUser}/>)}
        {this.props.hasMore ? (this.props.ready ? <LoadMore {...this.props}/> : <p>Loading…</p>) : <p>No more users</p>}
    </div>
    )
  }
}

//////////////////////////////////////////////////////
// Movie                                            //
//////////////////////////////////////////////////////

class Leader extends Component {

  render() {

    const user = this.props;
    return (
      <div key={user.username} style={{paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
        <div > <Link to={Users.getProfileUrl(user, false)} target={Users.getProfileUrl(user, false)}>
          {user.username}:

        </Link>  &nbsp;{user.telescope.karma}</div>
      </div>
    )
  }

}

//////////////////////////////////////////////////////
// Publications                                     //
//////////////////////////////////////////////////////

if (Meteor.isServer) {
  Meteor.publish('users.list', function () { return Meteor.users.find({}, {limit: 20},  {fields: {username: 1, 'telescope.karma': 1, 'telescope.slug': 1}}); }); 

}



const LoadMore = props => <a href="#" className="load-more button button--primary" onClick={props.loadMore}>Load More ({props.count}/{props.totalCount})</a>

//registerComponent('Leaderboard', Leaderboard);
export default Leaderboard;
