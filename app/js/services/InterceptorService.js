/**
 * Created by fechit01 on 15/10/2015.
 */
var services = angular.module('ComstackPMApp.Services');
services.factory('requestInterceptor', ['$q', 'configurationService', 'errorState', '$location',
  function ($q, configurationService, errorState, $location) {

    var request = function (config) {

      if (config.url.indexOf(configurationService.getSetting('api_url')) != -1) {
        if (!angular.isUndefined(config.params) && !angular.isUndefined(config.params.poll)) {
          config.params = config.params || {};
          config.params.before = configurationService.getSetting('lastMessageId');
        }
      }
      return config;
    };

    var responseError = function (rejection) {

      var settings = configurationService.get();
      if(rejection.status === 401) {
        $location.path(settings.base_url).replace();
        $scope.apply();
        return $q.reject(rejection);
      }
      if(rejection.status == 0) {
        rejection.status_text = "CORS error";
      }
      errorState.activate(settings.library_path + '/app/html/error.html', rejection);
      return $q.reject(rejection);


    };

    return {
      'request': request,
      'responseError': responseError
    }
  }]);

