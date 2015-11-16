define('app/initializers/ember-simple-auth', ['exports', 'ember', '../config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/session-stores/local-storage', 'ember-simple-auth/authenticators/devise', 'ember-simple-auth/authorizers/devise'], function (exports, _ember, _configEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService, _emberSimpleAuthSessionStoresLocalStorage, _emberSimpleAuthAuthenticatorsDevise, _emberSimpleAuthAuthorizersDevise) {
  'use strict';

  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry, application) {

      var config = _configEnvironment['default']['ember-auth'] || {};
      _emberSimpleAuthConfiguration['default'].load(config);

      if (true) {
        console.log('compat mode');
        application.register('session-store:application', _emberSimpleAuthSessionStoresLocalStorage['default']);
        application.register('authenticator:devise', _emberSimpleAuthAuthenticatorsDevise['default']);
        application.register('authorizer:devise', _emberSimpleAuthAuthorizersDevise['default']);
      }

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }

  };
});
