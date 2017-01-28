import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Users from 'meteor/nova:users';
import moment from 'moment';
//<div className="sr-only">Upvote</div>
//<div className="vote-count">{post.baseScore || 0}</div>

class Flag extends Component {

  constructor() {
    super();
    this.flag = this.flag.bind(this);
  }

  flag(e) {
    e.preventDefault();

    const post = this.props.post;
    const user = this.context.currentUser;

    console.log(user.hasDownvoted(post));
    function numberOfDownvotesInPast24Hours (user){
      var mNow = moment();
      var items = 0;

      user.telescope.downvotedPosts.forEach(function (entry){ 
        if(entry.votedAt > mNow.subtract(24, 'hours').toDate()){ items++; }
      });

      return items;
    }

    var maxDownvotesPer24Hours = Math.ceil(user.telescope.karma * 0.01);

    if(!user){
      this.context.messages.flash("Please log in first");
    } else if (user.hasDownvoted(post)) { 
      this.context.actions.call('posts.cancelDownvote', post._id, () => { //adding/ removing posts. has no effect
        this.context.events.track("post downvote cancelled", {'_id': post._id});
      });  
    } else if (numberOfDownvotesInPast24Hours(user) >= maxDownvotesPer24Hours){
      this.context.messages.flash("No more flags remaining");

    } else {
      console.log("downvote");
      this.context.actions.call('posts.downvote', post._id, () => {
        this.context.events.track("post downvoted", {'_id': post._id});
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
        <a className="upvote-button" onClick={this.flag}>
          <Telescope.components.Icon name="flag" />
          <div className="vote-count">{post.downvotes}</div> 
        </a>
       
      </div>
    )

  }


}

Flag.propTypes = {
  post: React.PropTypes.object.isRequired, // the current post
};

Flag.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object
};

module.exports = Flag;
export default Flag;