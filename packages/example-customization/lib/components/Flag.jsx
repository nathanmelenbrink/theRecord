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
  }

  downvote(e) {
    e.preventDefault();

    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    if(!user){
      this.props.flash(this.context.intl.formatMessage({id: 'users.please_log_in'}));
      // this.stopLoading();
    } else {
      const voteType = hasUpvoted(user, document) ? "cancelUpvote" : "upvote";
      this.props.vote({document, voteType, collection, currentUser: this.props.currentUser}).then(result => {
        // this.stopLoading();
      });
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


        <a  onClick={this.flag}>
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