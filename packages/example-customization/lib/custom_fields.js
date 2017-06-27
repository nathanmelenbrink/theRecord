import Posts from "meteor/vulcan:posts";
import Users from 'meteor/vulcan:users';

Posts.addField([
   /**
    Title
  */
  {
    fieldName: 'title',
    fieldSchema: {
      label: "Content",
      type: String,
      optional: false,
      max: 400,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: "textarea",
      order: 2
    }
  },
    /**
    URL
  */
  {
    fieldName: 'url',
    fieldSchema: {
      hidden: true,
      type: String,
      optional: true,
      max: 500,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: "text",
      order: 10
    }
  },
      /**
    URL
  */
  {
    fieldName: 'thumbnailUrl',
    fieldSchema: {
      hidden: true,
      type: String,
      optional: true,
      max: 500,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      control: "text",
      order: 10
    }
  },
  /**
    URL
  */
  {
    fieldName: 'link1',
    fieldSchema: {
      label: "Link 1 (required)",
      type: String,
      optional: false,
      max: 500,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: "text",
      order: 10
    }
  },
  /**
    URL
  */
  {
    fieldName: 'link2',
    fieldSchema: {
      label: "Link 2 (optional)",
      type: String,
      optional: true,
      max: 500,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: "text",
      order: 11
    }
  },
  /**
    URL
  */
  {
    fieldName: 'link3',
    fieldSchema: {
      label: "Link 2 (optional)",
      type: String,
      optional: true,
      max: 500,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: "text",
      order: 12
    }
  },
  /**
    Body
  */
  {
    fieldName: 'body',
    fieldSchema: {
      hidden: true,
      type: String,
      optional: true,
      max: 500,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: "text",
      order: 20
    }
  },
  /**
    Location the post refers to (defaults to current)
  */
  {
    fieldName: 'location',
    fieldSchema: {
      label: 'Location',
      type: String,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      form: {
        //defaultMessage: 'latLng' 
        //defaultValue: 'latLng' 
      },
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
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      optional: false,
      control: "datetime"
      //group: Posts.formGroups.admin
    }
  }

  ]);


/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

