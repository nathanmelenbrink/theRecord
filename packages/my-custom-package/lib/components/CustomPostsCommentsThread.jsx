import Telescope from 'meteor/nova:lib';
import React from 'react';
import {FormattedMessage } from 'react-intl';
import { ListContainer } from "meteor/utilities:react-list-container";
import { ModalTrigger } from "meteor/nova:core";
import Comments from "meteor/nova:comments";

const PostsCommentsThread = ({document}, {currentUser}) => {

  const post = document;

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

PostsCommentsThread.displayName = "PostsCommentsThread";

PostsCommentsThread.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = PostsCommentsThread;
export default PostsCommentsThread;