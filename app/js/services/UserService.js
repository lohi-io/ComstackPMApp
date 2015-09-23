var services = angular.module('ComstackPMApp.Services');

services.factory('User', ['$resource', 'ConfigurationService',
  function($resource, config) {
    var settings = config.get();
    return $resource('', {}, {
      getCurrentUser: {
        method: 'GET',
        url: settings.api_url+'/cs-pm/users/current-user?access_token='+settings.access_token,
        isArray: false
      }
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

