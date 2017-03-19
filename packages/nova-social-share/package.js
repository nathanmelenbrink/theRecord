Package.describe({
  name: "xavcz:nova-social-share",
  version: "1.2.0",
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

   api.use([
    // Nova packages
    'nova:core@0.27.5-nova',
    'nova:posts@0.27.5-nova',
    'nova:users@0.27.5-nova',
    'nova:comments@0.27.5-nova',

    // third-party packages
    'fortawesome:fontawesome@4.5.0',
    'tmeasday:check-npm-versions@0.3.1',
    'std:accounts-ui@1.2.6',
    'utilities:react-list-container@0.1.10',
  ]);

  api.mainModule('client.js', ['client']);
  api.mainModule('server.js', ['server']);

  api.addAssets(
    'lib/social.scss'
  , 'client');

});
