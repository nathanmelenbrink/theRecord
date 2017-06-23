
import { Components, getRawComponent, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage, FormattedRelative } from 'meteor/vulcan:i18n';

import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";
import gql from 'graphql-tag';

class CustomPostsItem extends getRawComponent('PostsItem') {

  render() {

    const post = this.props.post;
    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";
    
    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
        </div>

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={post.link1} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>


            <div className="posts-item-date"> <Link to={post.link1} className="posts-item-date" target={Posts.getLinkTarget(post)}>
             {Utils.getDomain(post.link1)} 
            </Link> </div>
            <div className="posts-item-date"> <Link to={post.link2} className="posts-item-date" target={Posts.getLinkTarget(post)}>
              {Utils.getDomain(post.link2)} 
            </Link> </div>
            <div className="posts-item-date"> <Link to={post.link3} className="posts-item-date" target={Posts.getLinkTarget(post)}>
              {Utils.getDomain(post.link3)} 
            </Link> </div>
            
            <div className="posts-item-date">  </div>

            {post.URL? <div className="posts-item-user"><Components.UsersName user={post.URL}/></div> : null}
            <div className="posts-page-social-buttons">
            <Components.SocialButton type="facebook" post={post}  /> 

            </div>
            <Components.Flag collection={Posts} document={post} currentUser={this.props.currentUser}/>

            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
          </div>

        </div>

        


      </div>
    )
  }
}

CustomPostsItem.propTypes = {
  currentUser: React.PropTypes.object,
  post: React.PropTypes.object.isRequired
};

CustomPostsItem.fragment = gql`
  fragment PostsItemFragment on Post {
    _id
    title
    url
    link1
    link2
    link3
  }
`;

replaceComponent('PostsItem', CustomPostsItem);

