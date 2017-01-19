import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FlashContainer } from "meteor/nova:core";

class Layout extends Component {

  render() {

    return (
      <div className="wrapper" id="wrapper">

        <Telescope.components.HeadTags />

        <Telescope.components.UsersProfileCheck {...this.props} />

        <Telescope.components.Header {...this.props}/>
      

        <div className="main">
          <Telescope.components.Newsletter />
          <FlashContainer component={Telescope.components.FlashMessages}/>

          {this.props.children}

        </div>
      
      
      </div>
    )

  }
}

Layout.displayName = "Layout";

module.exports = Layout;