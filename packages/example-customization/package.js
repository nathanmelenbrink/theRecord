Package.describe({
  name: "example-customization"
});

Package.onUse( function(api) {

  api.use([
    'fourseven:scss@3.8.0',

<<<<<<< HEAD:packages/my-custom-package/package.js
    'nova:core',
    'nova:base-components',
    'nova:posts',
    'nova:users',
    'xavcz:nova-social-share',
=======
    'example-forum',
>>>>>>> 3c41de5617043c14c6658e18c9b39171307e55b6:packages/example-customization/package.js
  ]);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
  
  api.addFiles([
    'lib/modules.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/stylesheets/custom.scss'
  ], ['client']);

  api.addFiles([
    'lib/server/templates.js'
  ], ['server']);

  api.addAssets([
    'lib/server/emails/customNewPost.handlebars',
    'lib/server/emails/customEmail.handlebars'
  ], ['server']);

});
