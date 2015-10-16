/**
 * Created by fechit01 on 15/10/2015.
 */
var services = angular.module('ComstackPMApp.Services');
services.factory('requestInterceptor', ['configurationService', function(configurationService) {
  return {
    'request': function(config) {
      // if needed, wrap the following in a condition
      if(config.url.indexOf(configurationService.getSetting('api_url')) != -1){
        if(!angular.isUndefined(config.params) && !angular.isUndefined(config.params.poll)){
        config.params = config.params || {};
        config.params.before = configurationService.getSetting('lastMessageId');
      }
      }
      return config;
    }
  }
}]);
