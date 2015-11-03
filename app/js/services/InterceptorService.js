/**
 * Created by fechit01 on 15/10/2015.
 */
var services = angular.module('ComstackPMApp.Services');
services.factory('requestInterceptor', ['$q', 'configurationService', 'errorState', '$window',
  function ($q, configurationService, errorState, $window) {

    var request = function (config) {

      if (config.url.indexOf(configurationService.getSetting('api_url')) != -1) {
        if (!angular.isUndefined(config.params) && !angular.isUndefined(config.params.poll)) {
          config.params = config.params || {};
          config.params.before = configurationService.getSetting('lastMessageId');
        }
      }
      return config;
    };


    // optional method
    var requestError = function(rejection) {
      var settings = configurationService.get();
      errorState.activate(settings.library_path + '/app/html/error.html', rejection);
      return $q.reject(rejection);
    };



    var responseError = function (rejection) {
      var settings = configurationService.get();
      if(rejection.status === 401) {
        $window.location.href = settings.base_url;
        return $q.reject(rejection);
      }

      console.log(rejection);
      errorState.activate(settings.library_path + '/app/html/error.html', rejection);
      return $q.reject(rejection);
    };

    return {
      'request': request,
      'requestError': requestError,
      'responseError': responseError
    }
  }]);

