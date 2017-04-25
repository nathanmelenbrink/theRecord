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

