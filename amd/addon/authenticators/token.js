define('ember-simple-auth/authenticators/token', ['exports', 'ember', './base', './../configuration'], function (exports, _ember, _base, _configuration) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;
  var get = _ember['default'].get;
  exports['default'] = _base['default'].extend({

    restore: function restore(data) {
      var tokenAttribute = get(data, _configuration['default'].tokenAttributeName);
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(tokenAttribute)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(identification, password) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var identificationAttributeName = _configuration['default'].identificationAttributeName;
        var data = {
          password: password,
          identificationAttributeName: identification
        };

        _this.makeRequest(data).then(function (response) {
          run(null, resolve, response);
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    invalidate: function invalidate() {
      return RSVP.resolve();
    },

    makeRequest: function makeRequest(data) {
      return _ember['default'].$.ajax({
        url: _configuration['default'].serverTokenEndpoint,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        beforeSend: function beforeSend(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }
      });
    }

  });
});
