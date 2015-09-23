var services = angular.module('ComstackPMApp.Services');

services.factory('ConfigurationService', ['$http', '$q', 'LocalSettings', function ($http, $q, LocalSettings) {

  var appSettings = LocalSettings;

  if (typeof Comstack != "undefined") {
    if (typeof Comstack.PMApp != "undefined") {
      if (typeof Comstack.PMApp.Settings != "undefined") {
        console.log('merge globals');
        angular.merge(appSettings, Comstack.PMApp.Settings)
      }
    }
  }


  var updateAccessToken = function(token){
    appSettings.access_token = token;
  };

  var get = function () {
     return appSettings;
  };

  var set = function (data) {
    appSettings = data;
  };

  return {
    appSettings: appSettings,
    get: get,
    set: set,
    updateAccessToken: updateAccessToken,
  }
}]);






