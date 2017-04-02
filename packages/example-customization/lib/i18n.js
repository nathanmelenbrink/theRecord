/*
  Let's add an international label to the field added in custom_fields.js
*/

import { addStrings } from 'meteor/vulcan:core';

addStrings('en', {
   "posts.location": "Location", // add a new one (collection.field: "Label")
  "posts.eventDate": "Event Date", // add a new one (collection.field: "Label")
  "posts.link1": "Link 1 (required)", // add a new one (collection.field: "Label")
  "posts.link2": "Link 2 (optional)", // add a new one (collection.field: "Label")
  "posts.link3": "Link 3 (optional)", // add a new one (collection.field: "Label")
  "posts.title": "Content" // add a new one (collection.field: "Label")
});

