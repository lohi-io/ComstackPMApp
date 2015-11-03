/**
 * Created by fechit01 on 23/09/2015.
 */
var serviceMockModule = angular.module('ComstackPMApp.ServicesMock',[]);

serviceMockModule.factory("configurationService", function () {
  var appSettings = {
    api_url: "",
    base_url: "",
    access_token: "",
    "poll_intervals": {
      "user_is_available": 10,
      "messages": 10
    },
    "max_participants": 2,
    "text__maxlength": 10,
    "strings": {
      "heading__messages": "Messages",
      "heading__conversation_with": "Conversation with @name",
      "text__last_message": "Last message",
      "text__no_available_users": "",
      "text__read_only": "You are @name@ with @user_id@",
      "form__new_conversation__header": 'You must be friends with a person before you can send them messages. <a href="https://.com/user/@user_id@/account-settings">Find and add friends</a>',
      "form__to__label": "To",
      "form__to__placeholder__singular": "Enter recipients username...",
      "form__to__placeholder__plural": "Enter recipients username...",
      "form__to__validation__limit_exceeded": "You cannot contact more than @@number_label@@ at once",
      "form__to__validation__empty": "Who would you like to talk to?",
      "form__text__placeholder": "Write a message...",
      "form__text__validation__empty": "You'll need to enter some text here...",
      "form__text__validation__maxlength": "You can only have @number@ characters per message",
      "form__new_conversation__submit": "Send"
    }
  };

  if (typeof Comstack != "undefined") {
    if (typeof Comstack.PMApp != "undefined") {
      if (typeof Comstack.PMApp.Settings != "undefined") {
        angular.merge(appSettings, Comstack.PMApp.Settings)
      }
    }
  }

  return {
    appSettings: appSettings,
    get: function () {
      return appSettings;
    },
    getString: function () {
        return "";
    },
    getSetting: function (key) {
      var setting = appSettings;

      if (angular.isString(key)) {
        key = [key];
      }

      if (!angular.isArray(key)) {
        return '';
      }

      angular.forEach(key, function(value) {
        setting = setting[value];
      });

      return setting;
    },
    setSettingValue: function(name, value){

    },
    updateAccessToken: function () {
    }
  };
});

//var configurationMockModule = angular.module('ComstackPMApp.ConfigurationMockModule',[]);
//configurationMockModule.factory("LocalSettings", function () {
//  return {
//    "api_url": "https://testpm.com/api",
//    "authorization_header": "",
//    "access_token": "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc",
//    "base_url" : "https://testpm.com",
//    strings:
//    {
//      "text__read_only": "You are @name@ with @user_id@"
//    }
//  }
//});
