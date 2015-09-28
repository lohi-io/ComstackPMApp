var services = angular.module('ComstackPMApp.Services');

services.factory('Conversation', ['$resource', 'configurationService',
  function($resource, config) {
    var settings = config.get();
    return $resource('/cs-pm/conversations', {}, {
      get: {
        method: 'GET',
        url: settings.api_url+'/cs-pm/conversations?access_token='+settings.access_token,
        params: {
          page: '@page'
        },
        isArray: false
      }
    });
  }
]);

services.factory('getConversations', ['Conversation', '$q', function(Conversation, $q) {
  var service = {};
  service.get = function(page)
  {
    var delay = $q.defer();
    Conversation.get({page: page
    }, function (conversation) {
      delay.resolve(conversation);
    }, function() {
      delay.reject('Unable to fetch the conversation');
    });
    return delay.promise;
  };
  return service;
}]);



//services.factory('GetConversations', ['Conversation', '$q', function(Conversation, $q) {
//  return function(page) {
//    var delay = $q.defer();
//    Conversation.get({
//      page: page
//    }, function (conversation) {
//      delay.resolve(conversation);
//    }, function() {
//      delay.reject('Unable to fetch the conversation');
//    });
//
//    return delay.promise;
//  };
//}]);
