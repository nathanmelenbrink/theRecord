import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Users from 'meteor/nova:users';
import moment from 'moment';


class CustomVote extends Component {

  constructor() {
    super();
    this.upvote = this.upvote.bind(this);
  }

  upvote(e) {
    e.preventDefault();

    const post = this.props.post;
    const user = this.context.currentUser;

    console.log(user.hasUpvoted(post));
    function numberOfUpvotesInPast24Hours (user){
      
      var items = 0;

      user.telescope.upvotedPosts.forEach(function (entry){ 
        var mNow = moment();
        if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
      });

      return items;
    }

    var maxUpvotesPer24Hours = Math.ceil(user.telescope.karma * 0.05) + 5;

    if(!user){
      this.context.messages.flash("Please log in first");
    } else if (user.hasUpvoted(post)) { // this function may be working, it's just that the array is empty
      console.log("cancel upvote");
      this.context.actions.call('posts.cancelUpvote', post._id, () => { //adding/ removing posts. has no effect
        this.context.events.track("post upvote cancelled", {'_id': post._id});
      });  
    } else if (numberOfUpvotesInPast24Hours(user) >= maxUpvotesPer24Hours){
      console.log(numberOfUpvotesInPast24Hours(user));
       this.context.messages.flash("Sorry, you cannot upvote more than " +maxUpvotesPer24Hours+ " posts within a 24 hour period. Try creating a new post to increase your Reputation by 10 points.");


    } else {
      console.log("upvote");
      this.context.actions.call('posts.upvote', post._id, () => {
        this.context.events.track("post upvoted", {'_id': post._id});
      });
    }

  }

  render() {

    
    const post = this.props.post;
    const user = this.context.currentUser;

    const hasUpvoted = Users.hasUpvoted(user, post);
    const hasDownvoted = Users.hasDownvoted(user, post);

    const actionsClass = classNames(
      "vote", 
      {voted: hasUpvoted || hasDownvoted},
      {upvoted: hasUpvoted},
      {downvoted: hasDownvoted}
    );

    return (
      <div className={actionsClass}>
        <a className="upvote-button" onClick={this.upvote}>
          <Telescope.components.Icon name="upvote" />
          <div className="sr-only">Upvote</div>
          <div className="vote-count">{post.baseScore || 0}</div> 
        </a>
       
      </div>
    )

  }


}

CustomVote.propTypes = {
  post: React.PropTypes.object.isRequired, // the current post
};

CustomVote.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object
};

module.exports = CustomVote;
export default CustomVote;