
Package.describe({
  name: "example-customization"
});

Package.onUse( function(api) {

  api.use([
<<<<<<< HEAD
    'fourseven:scss',
    //'xavcz:vulcan-social-share',
    'vulcan:core',
    'vulcan:forms',
    'vulcan:accounts',
    'vulcan:base-components',
    'vulcan:posts',
    'vulcan:users'
=======
    'vulcan:core',
    'example-forum',

    'fourseven:scss@4.5.0',
>>>>>>> 5f95749f1751afb114cceb152610e73ef553e412
  ]);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
  
  api.addFiles([
    'lib/stylesheets/custom.scss'
  ], ['client']);

  api.addAssets([
    'lib/server/emails/customNewPost.handlebars',
    'lib/server/emails/customEmail.handlebars'
  ], ['server']);

});