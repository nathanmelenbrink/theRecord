import React from 'react';
import {FormattedMessage } from 'react-intl';
import { Components, getRawComponent, replaceComponent, Utils } from 'meteor/vulcan:core';
import { ModalTrigger } from "meteor/vulcan:core";
import Comments from "meteor/vulcan:comments";

const CustomPostsCommentsThread = ({ currentUser}) => {
  return (
    <div>
     
    </div>
  )
}

replaceComponent('PostsCommentsThread', CustomPostsCommentsThread);