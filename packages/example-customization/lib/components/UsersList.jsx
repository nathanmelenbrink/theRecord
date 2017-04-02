/* 

List of movies. 
Wrapped with the "withList" and "withCurrentUser" containers.

*/

import React, { PropTypes, Component } from 'react';
import { Components, withList, withCurrentUser, Loading, registerComponent, withDocument } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import Users from 'meteor/vulcan:users';
import UsersItem from './UsersItem.jsx';



//////////////////////////////////////////////////////
// UsersList                                        //
//////////////////////////////////////////////////////

const UsersList = ({results = [], currentUser, loading, loadMore, count, totalCount}) => 
  
  //console.log(currentUser);
  <div  style={{paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc"}}>

    <h3>Leaderboard</h3>

    {

        // <div className="users">
        //    {results.map(user => <Leader key={user._id} {...user} currentUser={currentUser}/>)}
           
        //     load more */}

        //   {totalCount > results.length ?
        //     <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
        //     <p>No more items.</p>
        //   }
         

        // </div>
      
      }
               
  </div>
  
UsersList.displayName = "UsersList";

const options = {
  collection: Users,
  fragmentName: 'UsersProfile',
  limit: 5
};


//registerComponent('UsersList', UsersList, withCurrentUser, [withList, options]);

export default withList(options)(withCurrentUser(UsersList));