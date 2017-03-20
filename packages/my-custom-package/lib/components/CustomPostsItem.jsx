import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';
// import { Button } from 'react-bootstrap';
// import moment from 'moment';
// import { ModalTrigger } from "meteor/nova:core";
import Categories from "meteor/nova:categories";

class CustomPostsItem extends Telescope.components.PostsItem {

  render() {

    const post = this.props.post;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";


    return (
      <div className={postClass}>
        <MetaTags>
            <meta property="og:type" content="article" />
            <meta property="og:url" content={post.url}  />
            <meta property="og:image:url" content="/public/+1.svg" />
            <meta property="og:title" content="The Record" />
            <meta property="og:description" content="test" />
            <link data-react-helmet="true" rel="canonical" href="http://therecord.org"/>
            <meta data-react-helmet="true" property="og:title" content="The Record"/>
            <meta data-react-helmet="true" property="og:description" content={post.title}  />
            <meta data-react-helmet="true" property="og:image" content="public/+1.svg" />
          </MetaTags>

        <div className="posts-item-vote">
          <Telescope.components.Vote post={post} />
        </div>

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={Posts.getPageUrl(post)} className="posts-item-title-link" target={Posts.getPageUrl(post)}>
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

            {post.URL? <div className="posts-item-user">
            <Telescope.components.UsersName user={post.URL}/></div> : null}
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
