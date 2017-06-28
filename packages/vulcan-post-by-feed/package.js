Package.describe({
  name: "xavcz:vulcan-post-by-feed",
  summary: "Auto post via RSS to Vulcan, additional feature not part of core",
  version: "0.27.5-nova",
  git: "https://github.com/xavcz/nova-post-by-feed.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'vulcan:core',
    'fourseven:scss',
    'vulcan:forms',
    'vulcan:accounts',
    'vulcan:base-components',
    'vulcan:posts',
    'vulcan:users'

  ]);

  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');

  api.export([
    'Feeds'
  ]);
});
