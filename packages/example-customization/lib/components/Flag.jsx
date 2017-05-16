import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { withVote, hasUpvoted, hasDownvoted } from 'meteor/vulcan:voting';
import { FormattedMessage, intlShape } from 'react-intl';
import Users from 'meteor/vulcan:users';


class Flag extends Component {

  constructor() {
    super();
    this.downvote = this.downvote.bind(this);
    this.getActionClass = this.getActionClass.bind(this);
    // this.startLoading = this.startLoading.bind(this);
    // this.stopLoading = this.stopLoading.bind(this);
    this.state = {
      loading: false
    }
  }

  downvote(e) {
    e.preventDefault();

    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    if(!user){
      //this.context.messages.flash("Please log in first");
      this.props.flash(this.context.intl.formatMessage({id: 'users.please_log_in'}));
      // this.stopLoading();
    } else {

      var maxDownvotesPer24Hours = Math.ceil(user.karma * 0.01);
      const voteType = hasUpvoted(user, document) ? "cancelUpvote" : "upvote";

      //console.log(Users.numberOfDownvotesInPast24Hours(user));
      
      if (voteType == "downvote" && Users.numberOfDownvotesInPast24Hours(user) >= maxDownvotesPer24Hours){
        console.log(Users.numberOfDownvotesInPast24Hours(user));
        this.props.flash("Sorry, you cannot flag more than " +maxDownvotesPer24Hours+ " posts within a 24 hour period. Try creating a new post to increase your Reputation.");
      } else {
        this.props.vote({document, voteType, collection, currentUser: this.props.currentUser}).then(result => {
          // this.stopLoading();
        });
      } 
    }  
  }

  getActionClass() {
    const document = this.props.document;
    const user = this.props.currentUser;
    const post = this.props.post;

    const isUpvoted = hasUpvoted(user, document);
    const isDownvoted = hasDownvoted(user, document);
    const actionsClass = classNames(
      'vote', 
      {voted: isUpvoted || isDownvoted},
      {upvoted: isUpvoted},
      {downvoted: isDownvoted}
    );

    return actionsClass;
  }

  render() {
    return (
      <div className={this.getActionClass()}>


        <a  onClick={this.downvote}>
          <Components.Icon name="flag" /> 
        </a>
      </div>
    )
  }

}

Flag.propTypes = {
  document: React.PropTypes.object.isRequired, // the document to upvote
  collection: React.PropTypes.object.isRequired, // the collection containing the document
  vote: React.PropTypes.func.isRequired, // mutate function with callback inside
  currentUser: React.PropTypes.object, // user might not be logged in, so don't make it required
};

Flag.contextTypes = {
  intl: intlShape
};

registerComponent('Flag', Flag, withMessages, withVote);