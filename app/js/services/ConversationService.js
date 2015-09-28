var services = angular.module('ComstackPMApp.Services');

services.factory('Conversations', ['$resource', 'ConfigurationService',
  function($resource, config) {
    var settings = config.get();
    return $resource(settings.api_url + '/cs-pm/conversations/:id', {
      access_token: settings.access_token,
      page: '@page'
    });
  }
]);
