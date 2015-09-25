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

  var getString = function(name, values){

    var regExp = /@(\w*)@/gi;
    return appSettings.strings[name].replace(regExp, function(match) {
      console.log(match);
      match = match.replace(/@/gi,'');
      return values[match];
    });
  }

  return {
    appSettings: appSettings,
    get: get,
    set: set,
    updateAccessToken: updateAccessToken,
    getString: getString
  }
}]);






