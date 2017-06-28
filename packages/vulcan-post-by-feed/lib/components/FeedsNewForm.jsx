import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Components, registerComponent } from 'meteor/vulcan:core';
import Feeds from '../collection.js';

const FeedsNewForm = (props, context) => {

  return (
    <div style={{marginBottom: 15}}>
      <h2>Add a new feed</h2>
      
    </div>
  )
};

FeedsNewForm.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

module.exports = FeedsNewForm;
export default FeedsNewForm;