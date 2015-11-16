/**
 * Created by fechit01 on 15/10/2015.
 */
var services = angular.module('ComstackPMApp.Services');
services.factory('requestInterceptor', ['$q', 'configurationService', 'errorState', '$window', '$injector', '$log',
  function ($q, configurationService, errorState, $window, $injector, $log) {

    var settings = configurationService.get();

    function showError(error){
      if(!settings.http_error) {
        errorState.activate('html/error.html', error);
      }
    }

    function stopPolling(){
      if(settings.http_error){
        $injector.get('poller').stopAll();
      }
    }

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
        showError(rejection);
        stopPolling();

      return $q.reject(rejection);
    };

    var responseError = function (rejection) {
      if(rejection.status === 401) {
        $window.location.href = settings.base_url;
        return $q.reject(rejection);
      }
      $log.error(rejection);
      showError(rejection);
      stopPolling();
      return $q.reject(rejection);
    };

    return {
      'request': request,
      'requestError': requestError,
      'responseError': responseError
    }
  }]);

