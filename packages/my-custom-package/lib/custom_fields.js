import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';


// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Users.addField(
  {
    fieldName: "posts_per_day",
    fieldSchema: {
      type: Number,
      optional: true,
      publish: true,
      defaultValue: 10
    }
  }
);


Posts.removeField('body');
Posts.removeField('thumbnailUrl');

// just a test

//var latLng = Geolocation.latLng();

// meteor add aldeed:geocoder, in order to pull location strings from lat,lng
// var geo = new GeoCoder({
//   geocoderProvider: "google",
//   httpAdapter: "https",
//   apiKey: 'YOUR API KEY'
// });


// Posts.addField(
//   {
//     fieldName: 'color',
//     fieldSchema: {
//       type: String,
//       control: "select", // use a select form control
//       optional: true, // this field is not required
//       insertableIf: canInsert,
//       editableIf: canEdit,
//       form: {
//         options: function () { // options for the select form control
//           return [
//             {value: "white", label: "White"},
//             {value: "yellow", label: "Yellow"},
//             {value: "blue", label: "Blue"},
//             {value: "red", label: "Red"},
//             {value: "green", label: "Green"}
//           ];
//         }
//       },
//       publish: true // make that field public and send it to the client
//     }
//   }
// );

Posts.addField(
  {
    fieldName: 'location',
    fieldSchema: {
      label: 'Location',
      type: String,
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      form: {
        //defaultMessage: 'latLng' 
        //defaultValue: 'latLng' 
      },
      publish: true // make that field public and send it to the client
    }
  }
);

Posts.addField(
  {
    fieldName: 'eventDate',
    fieldSchema: {
      label: 'Event Date',
      type: Date,
      insertableIf: canInsert,
      editableIf: canEdit,
      publish: true,
      control: "datetime"
      //group: Posts.formGroups.admin
    }
  }
);

Posts.addField([
  /**
    How many rates the post has received
  */
  {
    fieldName: "flags",
    fieldSchema: {
      type: Number,
      optional: true,
      publish: true,
      defaultValue: 0
    }
  },
  /**
    An array containing the `_id`s of the post's raters
  */
  {
    fieldName: "flaggers",
    fieldSchema: {
      type: [String],
      optional: true,
      publish: true
    }
  }
  ]);


/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

import PublicationUtils from 'meteor/utilities:smart-publications';

PublicationUtils.addToFields(Posts.publishedFields.list, ["location", "eventDate", "color", "flags", "flaggers"]);


