import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';

const Layout = ({currentUser, children}) =>
  <div className="wrapper" id="wrapper">

    <Components.HeadTags />

<<<<<<< HEAD
        <Components.HeadTags {...this.props} />
=======
    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}
>>>>>>> 5f95749f1751afb114cceb152610e73ef553e412

    <Components.Header />
  
    <div className="main">

      <Components.FlashMessages />

      <Components.Newsletter />

      {children}

    </div>
  
    <Components.Footer />
  
  </div>

registerComponent('Layout', Layout, withCurrentUser);