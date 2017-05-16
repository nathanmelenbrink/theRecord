import { extendFragment, registerFragment } from 'meteor/vulcan:core';

extendFragment('PostsList', `
  _id
  link1
  link2
  link3
`);

extendFragment('PostsPage', `
	_id
  link1
  link2
  link3
`);

// this allows the CustomVote component to access and enforce post limits
extendFragment('UsersCurrent', `
    # vulcan:users
    ...UsersMinimumInfo
    karma
    # vulcan:posts
    postCount
    # vulcan:newsletter
    newsletter_subscribeToNewsletter
    # vulcan:notifications
    notifications_users
    notifications_posts
    # vulcan:voting
    downvotedComments {
      ...VotedItem
    }
    downvotedPosts {

      ...VotedItem
    }
    upvotedComments {
      ...VotedItem
    }
    upvotedPosts {
      ...VotedItem
    }
`);