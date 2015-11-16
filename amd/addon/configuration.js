define('ember-simple-auth/configuration', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var DEFAULTS = {
    compat: true,
    authenticationRoute: 'login',
    routeAfterAuthentication: 'stores',
    routeIfAlreadyAuthenticated: 'stores',
    refreshAfterInvalidation: false,
    serverTokenEndpoint: 'login',
    tokenAttributeName: 'token',
    cookieName: 'ember_simple_auth:session',
    localStorageKey: 'ember_simple_auth:session',
    baseURL: null
  };

  exports['default'] = {

    compat: DEFAULTS.compat,
    authenticationRoute: DEFAULTS.authenticationRoute,
    routeAfterAuthentication: DEFAULTS.routeAfterAuthentication,
    routeIfAlreadyAuthenticated: DEFAULTS.routeIfAlreadyAuthenticated,
    refreshAfterInvalidation: DEFAULTS.refreshAfterInvalidation,
    serverTokenEndpoint: DEFAULTS.serverTokenEndpoint,
    tokenAttributeName: DEFAULTS.tokenAttributeName,
    cookieName: DEFAULTS.cookieName,
    localStorageKey: DEFAULTS.localStorageKey,
    baseURL: DEFAULTS.baseURL,
    authenticationRoute: DEFAULTS.authenticationRoute,
    routeAfterAuthentication: DEFAULTS.routeAfterAuthentication,
    routeIfAlreadyAuthenticated: DEFAULTS.routeIfAlreadyAuthenticated,

    load: function load(config) {
      var wrappedConfig = _ember['default'].Object.create(config);
      for (var property in this) {
        if (this.hasOwnProperty(property) && _ember['default'].typeOf(this[property]) !== 'function') {
          this[property] = wrappedConfig.getWithDefault(property, DEFAULTS[property]);
        }
      }
    }
  };
});
