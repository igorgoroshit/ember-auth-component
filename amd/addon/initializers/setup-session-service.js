define('ember-simple-auth/initializers/setup-session-service', ['exports', '../utils/inject'], function (exports, _utilsInject) {
  'use strict';

  exports['default'] = setupSessionStore;

  function setupSessionStore(registry) {
    (0, _utilsInject['default'])(registry, 'service:session', 'session', 'session:main');
  }
});
