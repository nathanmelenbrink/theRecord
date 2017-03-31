import { Components, getRawComponent, replaceComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
<<<<<<< HEAD:packages/my-custom-package/lib/components/CustomPostsItem.jsx
// import { Button } from 'react-bootstrap';
// import moment from 'moment';
// import { ModalTrigger } from "meteor/nova:core";
import Categories from "meteor/nova:categories";
import Helmet from "react-helmet";
=======
import Posts from "meteor/vulcan:posts";
>>>>>>> 3c41de5617043c14c6658e18c9b39171307e55b6:packages/example-customization/lib/components/CustomPostsItem.jsx

class CustomPostsItem extends getRawComponent('PostsItem') {

  render() {

    const post = this.props.post;
    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";


    return (
      <div className={postClass}>
        <Helmet>
                <meta charSet="utf-8" />
                <title>The Record</title>
                <description> {post.title} </description>
                <link rel="canonical" href="http://therecord.org" />
        </Helmet>

        <div className="posts-item-vote">
<<<<<<< HEAD:packages/my-custom-package/lib/components/CustomPostsItem.jsx
          <Telescope.components.Vote post={post} />
          
        </div>


=======
          <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
        </div>

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}
>>>>>>> 3c41de5617043c14c6658e18c9b39171307e55b6:packages/example-customization/lib/components/CustomPostsItem.jsx

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={post.link1} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
<<<<<<< HEAD:packages/my-custom-package/lib/components/CustomPostsItem.jsx
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
=======
            {post.user? <div className="posts-item-user"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
>>>>>>> 3c41de5617043c14c6658e18c9b39171307e55b6:packages/example-customization/lib/components/CustomPostsItem.jsx
          </div>

        </div>

        


      </div>
    )
  }
}

<<<<<<< HEAD:packages/my-custom-package/lib/components/CustomPostsItem.jsx
CustomPostsItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

CustomPostsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default CustomPostsItem;
=======
replaceComponent('PostsItem', CustomPostsItem);
>>>>>>> 3c41de5617043c14c6658e18c9b39171307e55b6:packages/example-customization/lib/components/CustomPostsItem.jsx
