var services = angular.module('ComstackPmApp.Services');

services.factory('Conversation', ['$resource', 'ApiUrl', 'AccessToken',
  function($resource, ApiUrl, AccessToken) {
    return $resource('/cs-pm/conversations', {}, {
      get: {
        method: 'GET',
        url: ApiUrl +'/cs-pm/conversations?access_token=' + AccessToken,
        params: {
          page: '@page'
        },
        isArray: false
      }
    });
  }
]);

services.factory('GetConversations', ['Conversation', '$q', function(Conversation, $q) {
  return function(page) {
    var delay = $q.defer();
    Conversation.get({
      page: page
    }, function (conversation) {
      delay.resolve(conversation);
    }, function() {
      delay.reject('Unable to fetch the conversation');
    });

    return delay.promise;
  };
}]);
