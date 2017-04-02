// Explanation: 
// This is a migration script for your users to be compatible with the Apollo version of Nova
// We do not support anymore users properties on the `telescope` namespace. They will be duplicated onto __setting:
// Example: `user.telescope.karma` becomes `user.__karma`
// Note: we do not remove the `user.telescope` object, you'll still be able to go back to your previous full Meteor build if you feel that Apollo doesn't fit your needs

// How to use:
// Create a new /server directory at the root of your project then paste the script below in /server/migration.js

import Users from 'meteor/vulcan:users';

const Migrations = new Meteor.Collection('migrations');

Meteor.startup(function runMigrationToApollo() {
  
  const migrationName = 'userAccountsMigrationToApollo';
  const existingMigration = Migrations.findOne({name: migrationName});

  if (existingMigration){
    if(typeof existingMigration.finishedAt === 'undefined'){
      // if migration exists but hasn't finished, remove it and start fresh
      console.log('!!! Found incomplete migration "'+migrationName+'", running again.');
      Migrations.remove({name: migrationName});
    } else {
      // do nothing
      console.log('Migration "'+migrationName+'" already exists, doing nothing. Remove the migration code to remove this message, or delete the migration from the “Migrations” collection to run it again.')
      return;
    }
  }

  // find users with telescope fields (Nova-Classic) 
  const usersCursor = Users.find({telescope: {$exists: true}});
  
  const usersCount = usersCursor.count();
  const users = usersCursor.fetch();

  console.log('// --------------------------------------------------------');
  console.log('// Nova Users migration to Apollo data');

  // zero user to migrate \o/
  if (!usersCount) {
    console.log('// Status: All good! 👍 We didn\'t find any user to migrate! ');
    console.log('// ====> You should remove this script from your application! 🔭');
    console.log('// --------------------------------------------------------');
    
    return;
  }

  console.log(`// Status: Starting the migration, ${usersCount} users to migrate... (it may take some time)`);
  
  Migrations.insert({name: migrationName, startedAt: new Date(), completed: false});

  // duplicate telescope namespace to the root of the user object
  const apolloUsers = users.map(user => {
    // telescopeNamespace.bio = "Hey, I'm a Telescope Nova user!"
    // telescopeNamespace.email = "xxx@xxx.com"
    // telescopeNamespace.displayName = "John Doe"
    // telescopeNamespace.x = y
    const telescopeNamespace = user.telescope;

    // "bio" => {bio: "Hey, I'm a Telescope Nova user!"}
    // "email" => {email: "xxx@xxx.com"}
    // "displayName" => {displayName: "John Doe"}
    // "x" => {x: y}
    const arrayOfSettings = Object.keys(telescopeNamespace).map(key => {
      return {[key]: telescopeNamespace[key]};
    });
    
    // {
    //   _bio: "Hey, ...",
    //   _email: "xxx@xxx.com",
    //   _displayName: "John Doe",
    //   _x: "y"
    // }
    const newSettings = arrayOfSettings.reduce((result, item) => {
      return {
        ...result,
        ...item
      };
    }, {});
    
    // {
    //   _id: "yvZfYTWC8HZggSEa5",
    //   _bio "Hey, ...",
    //   _email: "xxx@xxx.com",
    //   _displayName: "John Doe",
    //   _x: "y"
    // }
    return {
      _id: user._id,
      ...newSettings
    };
  });
  
  // migrate the users with the new settings
  const migratedUsers = apolloUsers.map(apolloUserSettings => {
    const userId = apolloUserSettings._id;
    delete apolloUserSettings._id; // maybe not needed ? this is to avoid overwritting the _id, even if it's the same
    return Users.update({_id: userId}, {$set: apolloUserSettings});
  });
  
  // maybe do something on migratedUsers to check if there any false value (update failure) and log it? could this happen? Mongo connection lost?

  Migrations.update({name: migrationName}, {$set: {finishedAt: new Date(), completed: true, itemsAffected: usersCount}});
 
  console.log('// Status: Migration of Users to Apollo completed! 👍')
  console.log('// ====> You should remove this script from your application! 🔭');
  console.log('// --------------------------------------------------------');

});