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
      getUserFriends: {
        method: 'GET',
        url: settings.api_url+'/cs-pm/users/available-users?access_token='+settings.access_token,
        isArray: true
      },
    });
  }
]);

services.factory('getCurrentUser', ['User', '$q', function(User, $q) {
  var service = {};
  service.get = function()
  {
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

services.factory('getUserFriends', ['User', '$q', function(User, $q) {
  var service = {};
  service.get = function()
  {
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

