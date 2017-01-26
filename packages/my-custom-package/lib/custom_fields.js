import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';


// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

//Users.addField([


//   /**
//     User's current remaining posts
//   */
//   {
//     fieldName: "telescope.remainingPosts",
//     fieldSchema: {
//       type: Number,
//       publish: true,
//       defaultValue: 10
//     }
//   },
//   /**
//     User's current remaining flags
//   */
//   {
//     fieldName: "telescope.remainingFlags",
//     fieldSchema: {
//       type: Number,
//       publish: true,
//       defaultValue: 10
//     }
//   },
//   /**
//     User's current remaining votes
//   */
//   {
//     fieldName: "telescope.remainingVotes",
//     fieldSchema: {
//       type: Number,
//       publish: true,
//       defaultValue: 10
//     }
//   }
// ]);


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


Posts.addField([
  /**
    Location the post refers to (defaults to current)
  */
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
  },
  /**
    Time the post refers to (defaults to current)
  */
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
  // /**
  //   How many flags the post has received
  // */
  // {
  //   fieldName: "flags",
  //   fieldSchema: {
  //     type: Number,
  //     optional: true,
  //     publish: true,
  //     defaultValue: 0
  //   }
  // },
  // /**
  //   An array containing the `_id`s of the post's flaggers
  // */
  // {
  //   fieldName: "flaggers",
  //   fieldSchema: {
  //     type: [String],
  //     optional: true,
  //     publish: true
  //   }
  // }
  ]);


/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

import PublicationUtils from 'meteor/utilities:smart-publications';

PublicationUtils.addToFields(Posts.publishedFields.list, ["location", "eventDate", "color", "flags", "flaggers"]);

PublicationUtils.addToFields(Users.publishedFields.list, ["remainingPosts", "remainingFlags", "remainingVotes"]);


