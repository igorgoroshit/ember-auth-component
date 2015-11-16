define('app/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  'use strict';

  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
