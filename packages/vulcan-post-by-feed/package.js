Package.describe({
  name: "xavcz:vulcan-post-by-feed",
  summary: "Auto post via RSS to Vulcan, additional feature not part of core",
  version: "0.27.5-nova",
  git: "https://github.com/xavcz/nova-post-by-feed.git"
});

Npm.depends({
  'feedparser': '1.0.0',
  'to-markdown': '0.0.2',
  'he': '0.5.0',
  'iconv-lite': '0.4.7',
  'moment': '2.13.0',
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
