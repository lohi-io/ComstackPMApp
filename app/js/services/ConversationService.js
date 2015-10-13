var services = angular.module('ComstackPMApp.Services');

services.factory('Conversation', ['$resource', 'configurationService',
  function ($resource, config) {
    var settings = config.get();
    return $resource(settings.api_url + '/cs-pm/conversations/:id', {
      access_token: settings.access_token,
      page: '@page'
    }, {
      getMessages: {
        method: 'GET',
        url: settings.api_url + '/cs-pm/conversations/:id/messages/',
        params: {
          access_token: settings.access_token,
          before:'',
          after:''
        },
        isArray: false
      },
      reply: {
        method: 'POST',
        url: settings.api_url + '/cs-pm/conversations/:id/reply',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        },
        isArray: false
      },
      save: {
        method: "POST",
        headers: {
          'X-CSRF-Token': settings.csrf_token
        }
      },
      delete: {
        method: "DELETE",
        url: settings.api_url + '/cs-pm/conversations/:id',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        }
      },
      report: {
        method: "POST",
        url: settings.api_url + '/cs-pm/conversations/:id/report',
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

