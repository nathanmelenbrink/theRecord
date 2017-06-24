
Package.describe({
  name: "example-customization"
});

Package.onUse( function(api) {

  api.use([

    'fourseven:scss',
    //'xavcz:vulcan-social-share',
    'vulcan:core',
    'vulcan:forms',
    'vulcan:accounts',
    'vulcan:base-components',
    'vulcan:posts',
    'vulcan:users'

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