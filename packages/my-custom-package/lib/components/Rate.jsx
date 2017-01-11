import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Users from 'meteor/nova:users';

//<div className="sr-only">Upvote</div>
//<div className="vote-count">{post.baseScore || 0}</div>

class Rate extends Component {

  constructor() {
    super();
    this.rate = this.rate.bind(this);
  }

  rate(e) {
    e.preventDefault();

    const post = this.props.post;
    const user = this.context.currentUser;

    if(!user){
      this.context.messages.flash("Please log in first");
    } else if (user.hasRated(post)) {
      this.context.actions.call('posts.cancelRate', post._id, () => {
        this.context.events.track("post rate cancelled", {'_id': post._id});
      });        
    } else {
      this.context.actions.call('posts.rate', post._id, () => {
        this.context.events.track("post rated", {'_id': post._id});
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
          <Telescope.components.Icon name="best" />
        </a>
       
      </div>
    )

  }


}

Rate.propTypes = {
  post: React.PropTypes.object.isRequired, // the current post
};

Rate.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object
};

module.exports = Rate;
export default Rate;