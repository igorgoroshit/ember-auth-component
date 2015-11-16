define('ember-simple-auth/initializers/setup-session', ['exports', 'ember', '../internal-session', '../session-stores/ephemeral', '../session-stores/local-storage', '../utils/inject'], function (exports, _ember, _internalSession, _sessionStoresEphemeral, _sessionStoresLocalStorage, _utilsInject) {
  'use strict';

  exports['default'] = setupSession;

  function setupSession(registry) {
    registry.register('session:main', _internalSession['default']);

    // let store = LocalStorage;//'session-store:application';
    // if (Ember.testing) {
    //   store = 'session-store:test';
    //   registry.register(store, Ephemeral);
    // }
    (0, _utilsInject['default'])(registry, 'session:main', 'store', _sessionStoresLocalStorage['default']);
  }
});
