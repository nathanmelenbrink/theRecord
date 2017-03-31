import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
// import { Button } from 'react-bootstrap';
// import moment from 'moment';
// import { ModalTrigger } from "meteor/nova:core";
import Categories from "meteor/nova:categories";
import Helmet from "react-helmet";

class CustomPostsItem extends Telescope.components.PostsItem {

  render() {

    const post = this.props.post;
    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";


    return (
      <div className={postClass}>


        <div className="posts-item-vote">
          <Telescope.components.Vote post={post} />
          
        </div>



        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={post.link1} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Telescope.components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>

            <div className="posts-item-date"> <Link to={post.link1} className="posts-item-date" target={Posts.getLinkTarget(post)}>
             {Telescope.utils.getDomain(post.link1)} 
            </Link> </div>
            <div className="posts-item-date"> <Link to={post.link2} className="posts-item-date" target={Posts.getLinkTarget(post)}>
              {Telescope.utils.getDomain(post.link2)} 
            </Link> </div>
            <div className="posts-item-date"> <Link to={post.link3} className="posts-item-date" target={Posts.getLinkTarget(post)}>
              {Telescope.utils.getDomain(post.link3)} 
            </Link> </div>
            
            <div className="posts-item-date">  </div>

            {post.URL? <div className="posts-item-user"><Telescope.components.UsersName user={post.URL}/></div> : null}
             <Telescope.components.Flag post={post} />
            

            {this.context.currentUser && this.context.currentUser.isAdmin ? <Telescope.components.PostsStats post={post} /> : null}
            {this.renderActions()}
          </div>

        </div>

        


      </div>
    )
  }
}

CustomPostsItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

CustomPostsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default CustomPostsItem;