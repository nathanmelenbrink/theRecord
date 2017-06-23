import React, { PropTypes, Component } from 'react';
import Feeds from '../collection.js';
import { Components, registerComponent } from 'meteor/vulcan:core';

//class FeedsPage extends Component {

 // render() {
 //   return (
 const FeedsPage = (props, context) => {
      <div className="feeds-edit-form">
        <Components.ShowIf action="feeds.new"> 
          <Components.FeedsNewForm />
        </Components.ShowIf>
        
        <Components.ShowIf 
          action="feeds.view"
          displayNoPermissionMessage={true}
        >
          const terms = terms{{}};
        </Components.ShowIf>
      </div>
 };
//    );
//  }
//}

FeedsPage.displayName = "FeedsPage";
registerComponent('FeedsPage', FeedsPage);
//module.exports = FeedsPage;
//export default FeedsPage;