

import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";
import Users from "meteor/vulcan:users";

class UsersItem extends Component {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderActions() {
    return (
      <div className="post-actions">
        <ModalTrigger title="Edit Post" component={<a className="posts-action-edit"><FormattedMessage id="posts.edit"/></a>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </div>
    )
  }
  
  render() {

    const {user} = this.props;

    let postClass = "posts-item";
    //if (post.sticky) postClass += " posts-sticky";

    return (
  

      	<div key={user.username} style={{paddingTop: "5px", marginTop: "5px", paddingBottom: "15px", marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
	
	   		 	<Link to={Users.getProfileUrl(user, false)} target={Users.getProfileUrl(user, false)}>
	      			{user.username}:
				</Link>  
				&nbsp;{user.karma}
	
	    </div>

    )
  }
}

UsersItem.propTypes = {
  currentUser: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  terms: React.PropTypes.object,
};

registerComponent('UsersItem', UsersItem);