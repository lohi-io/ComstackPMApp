var app = angular.module('ComstackPMApp');
app.provider("configurationService", function () {

  var appSettings = {
    "base_url": "https://cancerchat01dev.prod.acquia-sites.com",
    "api_url": "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
    "local_host": "cancerchatdev.localweb",
    "environment": "",
    "authorization_header": "Basic Q1JVSzAxOnl1RGFiOG5lIQ==",
    "access_token": "",
    "csrf_token": "",
    "lastMessageId": 9999,
    "library_path": "http://cancerchatdev.localweb:8000",
    "max_participants": 2,
    "message_maxlength": 100000,
    "allow_emoji": false,
    "allow_separate_conversations": false,
    "share_data_storage": true,
    "poll_intervals": {
      "conversations": 30,
      "messages": 15,
      "available_users": 300
    },
    "strings": {
      "heading__messages": "Messages",
      "heading__conversation_with": "Conversation with @participants@",
      "text__last_message": "Last message",
      "text__no_available_users": "",
      "text__read_only": 'You\'re currently opted out of private messaging, <a href="https://.com/user/@user_id@/account-settings">click here</a> to go the the account settings form.',
      "text__select_messages_to_delete": "Select the messages you'd like to delete",
      "text__select_messages_to_report": "Select the messages you'd like to report",
      "text__no_conversations": '<p>You\'ve not been part of any conversations yet!</p><p>Make sure that you\'ve <a href="https://.com/friends/@user_id@">added your friends</a> then start a new conversation.</p>',
      "form__new_conversation__header": 'You must be friends with a person before you can send them messages. <a href="https://.com/user/@user_id@/account-settings">Find and add friends</a>',
      "form__to__label": "To",
      "form__to__placeholder__singular": "Enter recipients username...",
      "form__to__placeholder__plural": "Enter recipients username...",
      "form__to__validation__limit_exceeded": "You cannot contact more than @number_label@ at once",
      "form__to__validation__empty": "Who would you like to talk to?",
      "form__text__placeholder": "Write a message...",
      "form__text__validation__empty": "You'll need to enter some text here...",
      "form__text__validation__maxlength": "You can only have @@number@@ characters per message",
      "form__text__warning__emoji": "Emoji will be replaced with space",
      "form__new_conversation__submit": "Send",
      "form__reply__placeholder": "Enter your reply...",
      "form__reply__submit": "Reply",
      "form__report__label": "Reason for reporting",
      "form__report__submit": "Report",
      "link__delete": "Delete",
      "link__report": "Report",
      "link__block": "Block",
      "link__unblock": "Unblock",
      "link__no_available_users": "Find your friends",
      "button__new_conversation": "New message",
      "button__load_older_messages": "Load older messages",
      "button__friends_list": "Friends list",
      "button__ok": "OK",
      "button__cancel": "Cancel",
      "modal__delete_conversation__heading": "Delete conversation",
      "modal__delete_conversation__text": "Are you sure you want to delete this conversation?",
      "modal__report__heading": "Report conversation",
      "modal__block__heading": "Block user",
      "modal__block__text": "Are you sure you want to block the user @name@?",
      "modal__block__not__allowed__text": "You cannot block this user",
      "modal__block__text__multiple": "Users I want to block:",
      "modal__error__heading": "Error",
      "error__no_connection": "We're having trouble contacting the server, are you connected to the internet?",
      "error__api_bad_response": "The API returned an error so something has gone wrong, here it is @@error@@."
    }
  };

  if (typeof Comstack != "undefined") {
    if (typeof Comstack.PMApp != "undefined") {
      if (typeof Comstack.PMApp.Settings != "undefined") {
        angular.merge(appSettings, Comstack.PMApp.Settings)
      }
    }
  }

  this.setSettingValue = function (name, value) {
    appSettings[name] = value;
  };

  this.get = function () {
    return appSettings;
  };

  /**
   * Gets an app setting.
   *
   * In the case where a nested setting is required, an array of properties in order of nesting may be supplied.
   * @param {string|string[]} key
   * @returns {string|int}
   */
  this.getSetting = function (key) {
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
  };

  this.set = function (data) {
    appSettings = data;
  };

  this.getString = function (name, values) {

    values = values || {};
    var regExp = /@(\w*)@/gi;
    return appSettings.strings[name].replace(regExp, function (match) {
      match = match.replace(/@/gi, '');
      return values[match];
    });
  }

  this.appSettings = appSettings;
  var self = this;

  this.$get = function () {
    return {
      appSettings: self.appSettings,
      get: self.get,
      set: self.set,
      getSetting : self.getSetting,
      setSettingValue: self.setSettingValue,
      getString: self.getString
    }
  }
});
