import { Components, getRawComponent, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Posts from 'meteor/vulcan:posts';
import Users from 'meteor/vulcan:users';
import { Alert } from 'react-bootstrap';


const Error = ({error}) => <Alert className="flash-message" bsStyle="danger">{error.message}</Alert>

const UsersList = (props) => {

  const {results, loading, count, totalCount, loadMore, showHeader = true, networkStatus, currentUser, error, terms} = props;

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <div className="posts-list">
        <h3>Leaderboard</h3>
        {error ? <Error error={error} /> : null }
        <div className="posts-list-content">
          {results.map(user => <Components.UsersItem user={user} key={user._id} currentUser={currentUser} terms={terms} />)}
        </div>
        {hasMore ? (loadingMore ? <Components.PostsLoading/> : <Components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} />) : <Components.PostsNoMore/>}
      </div>
    )
  } else if (loading) {
    return (
      <div className="posts-list">
        <h3>Leaderboard</h3>
        {error ? <Error error={error} /> : null }
        <div className="posts-list-content">
          <Components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="posts-list">
        <h3>Leaderboard</h3>
        {error ? <Error error={error} /> : null }
        <div className="posts-list-content">
          <Components.PostsNoResults/>
        </div>
      </div>
    )  
  }
  
};

UsersList.displayName = "UsersList";

UsersList.propTypes = {
  results: React.PropTypes.array,
  terms: React.PropTypes.object,
  hasMore: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  count: React.PropTypes.number,
  totalCount: React.PropTypes.number,
  loadMore: React.PropTypes.func,
  showHeader: React.PropTypes.bool,
};

const options = {
  collection: Users,
  queryName: 'usersListQuery',
  fragmentName: 'UsersProfile',
};

/**
 * @summary Default view
 */
Users.addDefaultView(terms => ({
  options: {
    sort: {karma: -1}
  }
}));

registerComponent('UsersList', UsersList, withCurrentUser, [withList, options]);

