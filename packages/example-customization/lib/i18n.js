/*
  Let's add an international label to the field added in custom_fields.js
*/

import { addStrings } from 'meteor/vulcan:core';

<<<<<<< HEAD:packages/my-custom-package/lib/intl.js
Telescope.strings.en = {
  ...Telescope.strings.en, // get all the string translated
  "posts.color": "Color", // add a new one (collection.field: "Label")
  "posts.location": "Location", // add a new one (collection.field: "Label")
  "posts.eventDate": "Event Date", // add a new one (collection.field: "Label")
  "posts.link1": "Link 1 (required)", // add a new one (collection.field: "Label")
  "posts.link2": "Link 2 (optional)", // add a new one (collection.field: "Label")
  "posts.link3": "Link 3 (optional)", // add a new one (collection.field: "Label")
  "posts.title": "Content" // add a new one (collection.field: "Label")
};
=======
addStrings('en', {
  "posts.color": "Color" // add a new one (collection.field: "Label")
});
>>>>>>> 3c41de5617043c14c6658e18c9b39171307e55b6:packages/example-customization/lib/i18n.js
