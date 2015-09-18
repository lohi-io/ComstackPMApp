/**
 * Created by fechit01 on 11/09/2015.
 */
var services = angular.module('ComstackPmApp.Services');

services.factory('User', ['$resource', 'ApiUrl', 'AccessToken',
  function($resource, ApiUrl, AccessToken) {
    return $resource('', {}, {
      getCurrentUser: {
        method: 'GET',
        url: ApiUrl + '/cs-pm/users/current-user?access_token=' + AccessToken,
        isArray: false
      }
    });
  }
]);

services.factory('GetCurrentUser', ['User', '$q', function(User, $q) {
  return function() {
    var delay = $q.defer();
    User.getCurrentUser(function (user) {
        delay.resolve(user);
      }, function() {
        delay.reject('Unable to fetch current user');
      }
    );
    return delay.promise;
  };
}]);
