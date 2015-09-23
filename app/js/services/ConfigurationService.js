var services = angular.module('ComstackPmApp.Services');

services.factory('ConfigurationService', function ($http) {

  var settings={};

  var getConfig = function () {
    $http.get('/app/config.json').success(function(data) {
      settings = data;
    });
  }


  var updateAccessToken = function(token){
    settings.access_token = token;
  }

  var mergeGlobalSettings = function(){
    if (typeof Comstack != "undefined") {
      if (typeof Comstack.PMApp != "undefined") {
        if (typeof Comstack.PMApp.Settings != "undefined") {
          console.log('merge globals');
          angular.merge(settings, Comstack.PMApp.Settings)
        }
      }
    }
  };

  var get = function () {
     return settings;
  };

  getConfig();
  mergeGlobalSettings();

  return {
    settings: settings,
    get: get,
    updateAccessToken: updateAccessToken
  }

});






