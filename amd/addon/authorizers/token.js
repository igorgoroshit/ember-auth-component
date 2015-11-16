define('ember-simple-auth/authorizers/token', ['exports', 'ember', './base', './../configuration'], function (exports, _ember, _base, _configuration) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;
  exports['default'] = _base['default'].extend({

    authorize: function authorize(data, block) {
      var tokenAttributeName = _configuration['default'].tokenAttributeName;
      var userToken = data[tokenAttributeName];
      if (!isEmpty(userToken)) {
        block('Authorization', 'Token ' + userToken);
      }
    }

  });
});
