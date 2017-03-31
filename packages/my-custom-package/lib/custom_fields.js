import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';


// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Users.removeField('twitterUsername');

Posts.removeField('body');
Posts.removeField('thumbnailUrl');
Posts.removeField('url');
Posts.removeField('title');



Posts.addField([
   /**
    Title
  */
  {
    fieldName: 'title',
    fieldSchema: {
      type: String,
      optional: false,
      max: 400,
      insertableIf: canInsert,
      editableIf: canEdit,
      control: "textarea",
      publish: true,
      order: 2
    }
  },
  /**
    URL
  */
  {
    fieldName: 'link1',
    fieldSchema: {
      type: String,
      optional: false,
      max: 500,
      insertableIf: canInsert,
      editableIf: canEdit,
      control: "text",
      publish: true,
      order: 10
    }
  },
  /**
    URL
  */
  {
    fieldName: 'link2',
    fieldSchema: {
      type: String,
      optional: true,
      max: 500,
      insertableIf: canInsert,
      editableIf: canEdit,
      control: "text",
      publish: true,
      order: 11
    }
  },
  /**
    URL
  */
  {
    fieldName: 'link3',
    fieldSchema: {
      type: String,
      optional: true,
      max: 500,
      insertableIf: canInsert,
      editableIf: canEdit,
      control: "text",
      publish: true,
      order: 12
    }
  },
  /**
    Body
  */
  // {
  //   fieldName: 'text',
  //   fieldSchema: {
  //     label: 'Content',
  //     type: String,
  //     optional: false,
  //     max: 500,
  //     insertableIf: canInsert,
  //     editableIf: canEdit,
  //     control: "text",
  //     publish: true,
  //     order: 20
  //   }
  // },
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
      optional: false,
      publish: true,
      control: "datetime"
      //group: Posts.formGroups.admin
    }
  }

  ]);


/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

import PublicationUtils from 'meteor/utilities:smart-publications';

PublicationUtils.addToFields(Posts.publishedFields.list, ["location", "eventDate", "link1", "link2", "link3"]);

PublicationUtils.addToFields(Users.publishedFields.list, ["remainingPosts", "remainingFlags", "remainingVotes"]);
