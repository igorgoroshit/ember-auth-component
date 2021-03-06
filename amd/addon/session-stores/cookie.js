define('ember-simple-auth/session-stores/cookie', ['exports', 'ember', './base', '../utils/objects-are-equal'], function (exports, _ember, _base, _utilsObjectsAreEqual) {
  'use strict';

  var computed = _ember['default'].computed;
  var on = _ember['default'].on;

  /**
    Session store that persists data in a cookie.

    By default the cookie session store uses a session cookie that expires and is
    deleted when the browser is closed. The cookie expiration period can be
    configured by setting the
    {{#crossLink "CookieStore/cookieExpirationTime:property"}}{{/crossLink}}
    property. This can be used to implement "remember me" functionality that will
    either store the session persistently or in a session cookie depending on
    whether the user opted in or not:

    ```js
    // app/controllers/login.js
    export default Ember.Controller.extend({
      rememberMe: false,

      _rememberMeChanged: Ember.observer('rememberMe', function() {
        const expirationTime = this.get('rememberMe') ? (14 * 24 * 60 * 60) : null;
        this.set('session.store.cookieExpirationTime', expirationTime);
      }
    });
    ```

    __In order to keep multiple tabs/windows of an application in sync, this
    store has to periodically (every 500ms) check the cookie for changes__ as
    there are no events for cookie changes that the store could subscribe to. If
    the application does not need to make sure all session data is deleted when
    the browser is closed, the
    {{#crossLink "LocalStorageStore"}}`localStorage` session store{{/crossLink}}
    should be used.

    @class CookieStore
    @module ember-simple-auth/session-stores/cookie
    @extends BaseStore
    @public
  */
  exports['default'] = _base['default'].extend({
    /**
      The domain to use for the cookie, e.g., "example.com", ".example.com"
      (which includes all subdomains) or "subdomain.example.com". If not
      explicitly set, the cookie domain defaults to the domain the session was
      authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds. A value of `null` will make
      the cookie a session cookie that expires and gets deleted when the browser
      is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _secureCookies: window.location.protocol === 'https:',

    _syncDataTimeout: null,

    _renewExpirationTimeout: null,

    _isPageVisible: computed(function () {
      var visibilityState = document.visibilityState || 'visible';
      return visibilityState === 'visible';
    }).volatile(),

    _setup: on('init', function () {
      this._syncData();
      this._renewExpiration();
    }),

    /**
      Persists the `data` in the cookie.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      data = JSON.stringify(data || {});
      var expiration = this._calculateExpirationTime();
      this._write(data, expiration);
      this._lastData = this.restore();
    },

    /**
      Returns all data currently stored in the cookie as a plain object.
       @method restore
      @return {Object} The data currently persisted in the cookie.
      @public
    */
    restore: function restore() {
      var data = this._read(this.cookieName);
      if (_ember['default'].isEmpty(data)) {
        return {};
      } else {
        return JSON.parse(data);
      }
    },

    /**
      Clears the store by deleting the cookie.
       @method clear
      @public
    */
    clear: function clear() {
      this._write(null, 0);
      this._lastData = {};
    },

    _read: function _read(name) {
      var value = document.cookie.match(new RegExp(name + '=([^;]+)')) || [];
      return decodeURIComponent(value[1] || '');
    },

    _calculateExpirationTime: function _calculateExpirationTime() {
      var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
      cachedExpirationTime = !!cachedExpirationTime ? new Date().getTime() + cachedExpirationTime * 1000 : null;
      return !!this.cookieExpirationTime ? new Date().getTime() + this.cookieExpirationTime * 1000 : cachedExpirationTime;
    },

    _write: function _write(value, expiration) {
      var path = '; path=/';
      var domain = _ember['default'].isEmpty(this.cookieDomain) ? '' : '; domain=' + this.cookieDomain;
      var expires = _ember['default'].isEmpty(expiration) ? '' : '; expires=' + new Date(expiration).toUTCString();
      var secure = !!this._secureCookies ? ';secure' : '';
      document.cookie = this.cookieName + '=' + encodeURIComponent(value) + domain + path + expires + secure;
      if (expiration !== null) {
        var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
        document.cookie = this.cookieName + ':expiration_time=' + encodeURIComponent(this.cookieExpirationTime || cachedExpirationTime) + domain + path + expires + secure;
      }
    },

    _syncData: function _syncData() {
      var data = this.restore();
      if (!(0, _utilsObjectsAreEqual['default'])(data, this._lastData)) {
        this._lastData = data;
        this.trigger('sessionDataUpdated', data);
      }
      if (!_ember['default'].testing) {
        _ember['default'].run.cancel(this._syncDataTimeout);
        this._syncDataTimeout = _ember['default'].run.later(this, this._syncData, 500);
      }
    },

    _renew: function _renew() {
      var data = this.restore();
      if (!_ember['default'].isEmpty(data) && data !== {}) {
        data = _ember['default'].typeOf(data) === 'string' ? data : JSON.stringify(data || {});
        var expiration = this._calculateExpirationTime();
        this._write(data, expiration);
      }
    },

    _renewExpiration: function _renewExpiration() {
      if (this.get('_isPageVisible')) {
        this._renew();
      }
      if (!_ember['default'].testing) {
        _ember['default'].run.cancel(this._renewExpirationTimeout);
        this._renewExpirationTimeout = _ember['default'].run.later(this, this._renewExpiration, 60000);
      }
    }
  });
});
