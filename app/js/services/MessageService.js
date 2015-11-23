var services = angular.module('ComstackPMApp.Services');

services.factory('Message', ['$resource', 'configurationService', '$filter',
  function ($resource, config, $filter) {
    var settings = config.get();
    var Message = $resource(settings.api_url + '/cs-pm/conversations/:id/messages', {
      access_token: settings.access_token
    }, {
      get: {
        method: 'GET',
        url: settings.api_url + '/cs-pm/conversations/:id/messages/',
        params: {
          access_token: settings.access_token,
          before:'',
          after:'',
          range: 10
        },
        isArray: false
      }

    });

    return Message;
  }
]);


