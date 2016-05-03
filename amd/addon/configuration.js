define('ember-simple-auth/configuration', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var DEFAULTS = {
    compat: true,
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index',
    refreshAfterInvalidation: true,
    serverTokenEndpoint: 'login',
    tokenAttributeName: 'token',
    identificationAttributeName: 'email',
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
    identificationAttributeName: DEFAULTS.identificationAttributeName,
    cookieName: DEFAULTS.cookieName,
    localStorageKey: DEFAULTS.localStorageKey,
    baseURL: DEFAULTS.baseURL,

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
