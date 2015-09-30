var services = angular.module('ComstackPMApp.Services');

services.factory('Conversation', ['$resource', 'configurationService',
  function($resource, config) {
    var settings = config.get();
    return $resource(settings.api_url + '/cs-pm/conversations/:id', {
      access_token: settings.access_token,
      page: '@page'
    }, {
      getMessages: {
        method: 'GET',
        url: settings.api_url + '/cs-pm/conversations/:id/messages',
        params: {
          access_token: settings.access_token
        },
        isArray: false
      }
    });
  }
]);
