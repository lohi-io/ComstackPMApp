/**
 * Created by fechit01 on 23/09/2015.
 */
var serviceMockModule = angular.module('ComstackPMApp.ServicesMock',[]);

serviceMockModule.factory("configurationService", function () {
    return {
      appSettings: {
        api_url: "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
        access_token: "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc",
        "max_participants": 2,
        "message_maxlength": 10,
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
          "form__new_conversation__submit": "Send",
        }
      },
      get: function () {
        return {
          api_url: "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
          access_token: "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc",
          "max_participants": 2,
          "message_maxlength": 10,
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
            "form__new_conversation__submit": "Send",
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
    "base_url" : "baseUrl",
    strings:
    {
      "text__read_only": "You are @name@ with @user_id@"
    }
  }
});
