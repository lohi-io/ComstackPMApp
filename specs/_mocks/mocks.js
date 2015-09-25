/**
 * Created by fechit01 on 23/09/2015.
 */
var serviceMockModule = angular.module('ComstackPMApp.ServicesMock',[]);

serviceMockModule.factory("ConfigurationService", function () {
    return {
      appSettings: {
        api_url: "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
        access_token: "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc",
        "strings": {
          "heading__messages": "Messages",
          "heading__conversation_with": "Conversation with @name",
          "text__last_message": "Last message",
          "text__no_available_users": "",
          "text__read_only": "You are @name@ with @user_id@"
        }
      },
      get: function () {
        return {
          api_url: "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
          access_token: "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc",
          "strings": {
            "heading__messages": "Messages",
            "heading__conversation_with": "Conversation with @name",
            "text__last_message": "Last message",
            "text__no_available_users": "",
            "text__read_only": "You are @name@ with @user_id@"
          }
        }
      },
      getString: function () {
          return "";
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
