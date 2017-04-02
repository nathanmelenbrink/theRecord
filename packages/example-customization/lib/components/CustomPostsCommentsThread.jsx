//import Telescope from 'meteor/nova:lib';
import React from 'react';
import {FormattedMessage } from 'react-intl';
import { Components, getRawComponent, replaceComponent, Utils } from 'meteor/vulcan:core';
import { ModalTrigger } from "meteor/vulcan:core";
import Comments from "meteor/vulcan:comments";

class CustomPostsCommentsThread extends getRawComponent('PostsCommentsThread') {

  //const post = document;

  render() {
  return (
    <div className="posts-comments-thread">
     
      { currentUser ?
        <div className="posts-comments-thread-new">
          
          
        </div> :
        <div>

        </div> }
    </div>
  )
};
}

CustomPostsCommentsThread.displayName = "PostsCommentsThread";

CustomPostsCommentsThread.contextTypes = {
  currentUser: React.PropTypes.object
};


replaceComponent('PostsCommentsThread', CustomPostsCommentsThread);