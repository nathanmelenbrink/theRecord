import { extendFragment, registerFragment } from 'meteor/vulcan:core';

extendFragment('PostsList', `
  color # new custom property!
`);

extendFragment('PostsPage', `
  color # new custom property!
`);

registerFragment(`
  fragment UsersItemFragment on User {
    _id
    createdAt
    karma
  }
`);