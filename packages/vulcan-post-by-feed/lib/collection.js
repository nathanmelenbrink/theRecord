import Users from 'meteor/vulcan:users';
import Categories from 'meteor/vulcan:categories';
import SimpleSchema from 'simpl-schema';

// check if user can create a new feed
//const canInsert = user => Users.canDo(user, 'feeds.new');

// check if user can edit a feed
//const canEdit = user => Users.canDo(user, 'feeds.edit');

const Feeds = new Mongo.Collection('feeds');

Feeds.schema = new SimpleSchema({
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    //publish: true,
  },
  title: {
    type: String,
    optional: true,
    //publish: true,
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
  },
  userId: {
    type: String,
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    control: 'select',
    //publish: true,
    form: {
      prefill: () => Meteor.userId(),
      options: () => {
        // only find admins and owners, even if the feeds modal is opened on a normal user profile page
        return Users.find({ $or: [{ isAdmin: true }, { isOwner: true }] }).map((user) => {
          return {
            value: user._id,
            label: Users.getDisplayName(user)
          };
        });
      }
    },
    resolveAs: 'user: User',
    // join: {
    //   joinAs: 'user',
    //   collection: () => Users
    // }
  },
  categories: {
    type: Array,
    control: 'checkboxgroup',
    optional: true,
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    form: {
      noselect: true,
      type: 'bootstrap-category',
      order: 50,
      options: formProps => getCategoriesAsOptions(formProps.client),
      // options: () => {
      //   return Categories.find().map((category) => {
      //     return {
      //       value: category._id,
      //       label: category.name
      //     };
      //   });
      // }
    },
    //publish: true,
    resolveAs: 'categories: [Category]',
    // join: {
    //   joinAs: 'categoriesArray',
    //   collection: () => Categories
    // }
  },
  // if true, block the edit / removal from the UI Component <FeedsItem/>
  // it differs from the settings collection where an attribute is set on insertableIf / editableIf which is done serverside
  // it differs from the categories collection where you can edit a category created from the settings (at this time)
  createdFromSettings: {
    type: Boolean,
    optional: true,
  },
  subjectToParsingErrors: {
    type: Boolean,
    optional: true,
  }
});

Feeds.attachSchema(Feeds.schema);

export default Feeds;