var services = angular.module('ComstackPMApp.Services');

services.factory('User', ['$resource', 'configurationService',
  function($resource, config) {
    var settings = config.get();
    return $resource('', {}, {
      getCurrentUser: {
        method: 'GET',
        url: settings.api_url+'/cs-pm/users/current-user?access_token='+settings.access_token,
        isArray: false
      },
      getAvailableUsers: {
        method: 'GET',
        url: settings.api_url+'/cs-pm/users/available-users',
        params: {
          access_token: settings.access_token,
          'autocomplete[string]': '@search'
        },
        isArray: false
      },
      getBlockedUsers: {
        method: 'GET',
        url: settings.api_url + '/cs-fr/blocked',
        params: {
          access_token: settings.access_token
        }
      },
      block: {
        method: "POST",
        url: settings.api_url + '/cs-fr/blocked',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        }
      }
    });
  }
]);

services.factory('getCurrentUser', ['User', '$q', function(User, $q) {
  var service = {};
  service.get = function() {
    var delay = $q.defer();
    User.getCurrentUser(function (user) {
      delay.resolve(user);
    }, function() {
        delay.reject('Unable to fetch current user');
      }
    );
    return delay.promise;
  };
  return service;
}]);

services.factory('getAvailableUsers', ['User', '$q', function(User, $q) {
  var service = {};
  service.get = function(search) {
    var delay = $q.defer();
    User.getAvailableUsers({'autocomplete[string]': search}, function (user) {
      delay.resolve(user);
    }, function() {
        delay.reject('Unable to fetch current user');
      }
    );
    return delay.promise;
  };
  return service;
}]);

