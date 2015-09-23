/**
 * Created by fechit01 on 23/09/2015.
 */
var serviceMockModule = angular.module('ComstackPMApp.ServicesMock',[]);

serviceMockModule.factory("ConfigurationService", function () {
    return {
      appSettings: {
        api_url: "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
        access_token: "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc"
      },
      get: function () {
        return {
          api_url: "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
          access_token: "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc"
        }
      },
      getLocalAppSettings: function () {
      },
      updateAccessToken: function () {
      }
    }
  });

var configurationMockModule = angular.module('ComstackPMApp.ConfigurationMockModule',[]);
configurationMockModule.factory("LocalSettings", function () {
  return {
    "api_url": "https://test.cancerresearchuk.org/about-cancer/cancer-chat/api/v1",
    "authorization_header": "Basic Q1JVSzAxOnl1RGFiOG5lIQ==",
    "access_token": "",
    "base_url" : "baseUrl"
  }
});
