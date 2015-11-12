define('ember-simple-auth/authenticators/torii', ['exports', 'ember', './base'], function (exports, _ember, _base) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;

  /**
    Authenticator that wraps the
    [Torii library](https://github.com/Vestorly/torii) and thus allows to connect
    any external authentication provider that torii defines a provider for.

    In order to use this authenticator, __the application needs to have the
    [torii addon](https://github.com/Vestorly/torii) installed and must inject
    the torii service into the authenticator__:

    ```js
    // app/authenticators/torii.js
    import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';

    export default ToriiAuthenticator.extend(
      torii: Ember.inject.service()
    )
    ```

    @class ToriiAuthenticator
    @module ember-simple-auth/authenticators/torii
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _base['default'].extend({
    _provider: null,

    /**
      Restores the session by calling the torii provider's `fetch` method.
       __Many torii providers do not implement the `fetch` method__. If the
      provider in use does not implement the method simply add it as follows:
       ```js
      // app/providers/facebook.js
      import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';
       export default FacebookOauth2Provider.extend({
        fetch(data) {
          return data;
        }
      });
      ```
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      this._assertToriiIsPresent();

      data = data || {};
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(data.provider)) {
          (function () {
            var _data = data;
            var provider = _data.provider;

            _this.get('torii').fetch(data.provider, data).then(function (data) {
              _this._resolveWith(provider, data, resolve);
            }, function () {
              delete _this._provider;
              reject();
            });
          })();
        } else {
          delete _this._provider;
          reject();
        }
      });
    },

    /**
      Authenticates the session by opening the torii provider. For more
      documentation on torii, see the
      [project's README](https://github.com/Vestorly/torii#readme).
       @method authenticate
      @param {String} provider The torii provider to authenticate the session with
      @param {Object} options The options to pass to the torii provider
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(provider, options) {
      var _this2 = this;

      this._assertToriiIsPresent();

      return new RSVP.Promise(function (resolve, reject) {
        _this2.get('torii').open(provider, options || {}).then(function (data) {
          _this2._resolveWith(provider, data, resolve);
        }, reject);
      });
    },

    /**
      Closes the torii provider. If the provider is successfully closed, this
      method returns a resolving promise, otherwise it will return a rejecting
      promise, thus intercepting session invalidation.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate() {
      var _this3 = this;

      return new RSVP.Promise(function (resolve, reject) {
        _this3.get('torii').close(_this3._provider).then(function () {
          delete _this3._provider;
          resolve();
        }, reject);
      });
    },

    _resolveWith: function _resolveWith(provider, data, resolve) {
      data.provider = provider;
      this._provider = data.provider;
      resolve(data);
    },

    _assertToriiIsPresent: function _assertToriiIsPresent() {
      var torii = this.get('torii');
      _ember['default'].assert('You are trying to use the torii authenticator but torii is not available. Inject torii into the authenticator with "torii: Ember.inject.service()".', _ember['default'].isPresent(torii));
    }
  });
});
