
import Telescope from 'meteor/nova:lib';
//import React from 'react';
import Users from 'meteor/nova:users';
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
              terms={{options: {sort: {createdAt: -1}}}}
              options={{sort: {createdAt: -1}}}
              joins={Users.getJoins()}
              limit={5}
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
        {this.props.results.map(leader => <Leader key={user.username} {...user} currentUser={this.props.currentUser}/>)}
        {this.props.hasMore ? (this.props.ready ? <LoadMore {...this.props}/> : <p>Loading…</p>) : <p>No more movies</p>}
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
        <h2>{user.username} ({user.telescope.karma})</h2>
      </div>
    )
  }

}

//////////////////////////////////////////////////////
// Methods                                          //
//////////////////////////////////////////////////////

// Movies.smartMethods({
//   createName: "movies.create",
//   editName: "movies.edit",
//   createCallback: function (user, document) {
//     document = _.extend(document, {
//       createdAt: new Date(),
//       userId: Meteor.userId()
//     });
//     return document;
//   },
//   deleteCallback: isOwner
// });

//////////////////////////////////////////////////////
// Publications                                     //
//////////////////////////////////////////////////////

if (Meteor.isServer) {
  Users.smartPublish("users.list");
}



const LoadMore = props => <a href="#" className="load-more button button--primary" onClick={props.loadMore}>Load More ({props.count}/{props.totalCount})</a>

//registerComponent('Leaderboard', Leaderboard);
export default Leaderboard;
