
import Users from 'meteor/vulcan:users';
import moment from 'moment';

import { Components, withCurrentUser, replaceComponent, withMessages } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { withVote, hasUpvoted, hasDownvoted } from 'meteor/vulcan:voting';
import { FormattedMessage, intlShape } from 'react-intl';


class CustomVote extends Component {

  constructor() {
    super();
    this.upvote = this.upvote.bind(this);
    this.getActionClass = this.getActionClass.bind(this);
    // this.startLoading = this.startLoading.bind(this);
    // this.stopLoading = this.stopLoading.bind(this);
    this.state = {
      loading: false
    }
  }

  upvote(e) {
    e.preventDefault();

    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    // function numberOfUpvotesInPast24Hours (user){
    //   var items = 0;
    //   var mNow = moment();
    //   mNow.subtract(24, 'hours').toDate();

    //   user.upvotedPosts.forEach(function (entry){ 
    //     if(mNow.isSameOrBefore(entry.votedAt)){ 
    //       console.log(entry.votedAt); 
    //       console.log(mNow._d); 
    //       items++; 
    //     }
    //   });

    //   //console.log(items);
    //   return items;
    // }

    //var maxUpvotesPer24Hours = Math.ceil(user.karma * 0.05) + 5;


    if(!user){
      //this.context.messages.flash("Please log in first");
      this.props.flash(this.context.intl.formatMessage({id: 'users.please_log_in'}));
      // this.stopLoading();
    } else {

      var maxUpvotesPer24Hours = Math.ceil(user.karma * 0.05) + 5;
      const voteType = hasUpvoted(user, document) ? "cancelUpvote" : "upvote";

      //console.log(Users.numberOfUpvotesInPast24Hours(user));
      
      if (voteType == "upvote" && Users.numberOfUpvotesInPast24Hours(user) >= maxUpvotesPer24Hours){
        console.log(Users.numberOfUpvotesInPast24Hours(user));
        this.props.flash("Sorry, you cannot upvote more than " +maxUpvotesPer24Hours+ " posts within a 24 hour period. Try creating a new post to increase your Reputation.");
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
        <a className="upvote-button" onClick={this.upvote}>
          <Components.Icon name="upvote" />
          <div className="sr-only">Upvote</div>
          <div className="vote-count">{this.props.document.baseScore || 0}</div> 
        </a>
       
      </div>
    )

  }


}

CustomVote.propTypes = {
  document: React.PropTypes.object.isRequired, // the document to upvote
  collection: React.PropTypes.object.isRequired, // the collection containing the document
  vote: React.PropTypes.func.isRequired, // mutate function with callback inside
  currentUser: React.PropTypes.object, // user might not be logged in, so don't make it required
};

CustomVote.contextTypes = {
  intl: intlShape
};

replaceComponent('Vote', CustomVote, withCurrentUser);
