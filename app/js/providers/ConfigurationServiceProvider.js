var app = angular.module('ComstackPMApp');
app.provider("configurationService", function () {

  var appSettings = {
    "base_url": "",
    "api_url": "",
    "local_host": "",
    "environment": "",
    "authorization_header": "",
    "access_token": "",
    "csrf_token": "",
    "lastMessageId": 0,
    "library_path": "",
    "max_participants": 2,
    "text__maxlength": 100000,
    "allow_emoji": false,
    "allow_separate_conversations": false,
    "share_data_storage": true,
    "debug_mode": false,
    "http_error": false,
    "poll_intervals": {
      "0": {
        "conversations": 30,
        "messages": 15,
        "available_users": 300,
        "user_is_available": 15
      },
      "1": {
        "conversations": 90,
        "messages": 45,
        "available_users": 900,
        "user_is_available": 45
      },
      "2": {
        "conversations": 300,
        "messages": 150,
        "available_users": 3000,
        "user_is_available": 150
      },
      "3": {
        "conversations": 600,
        "messages": 300,
        "available_users": 6000,
        "user_is_available": 300
      }
    },
    "strings": {
      "heading__messages": "Messages",
      "heading__conversation_with": "Conversation with @participants@",
      "text__last_message": "Last message",
      "text__no_available_users": "",
      "text__report_success": 'Your conversation with @participants@ has been reported',
      "text__block_success": "@participant@ is now blocked. They can no longer send you a private message.",
      "text__forced_read_only": "Private messaging has been temporarily disabled.",
      "text__read_only": 'You\'re currently opted out of private messaging, <a href="@base_url@/user/@user_id@/account-settings">click here</a> to go the the account settings form.',
      "text__select_messages_to_delete": "Select the messages you'd like to delete",
      "text__select_messages_to_report": "Select the messages you'd like to report",
      "text__no_conversations": '<p>You\'ve not been part of any conversations yet.</p><p>Make sure that you\'ve <a href="@base_url@/friends/@user_id@">added your friends</a> then start a new conversation.</p>',
      "text__no_conversations_no_friends": "You need to add contacts before you can start a conversation.",
      "form__new_conversation__header": 'You must be friends with a person before you can send them messages. <a href="@base_url@/friends/@user_id@">Find and add friends</a>',
      "form__to__label": "To",
      "form__to__placeholder__singular": "Enter recipients username...",
      "form__to__placeholder__plural": "Enter recipients username...",
      "form__to__validation__limit_exceeded": "You cannot contact more than @number_label@ at once",
      "form__to__validation__empty": "Who would you like to talk to?",
      "form__text__placeholder": "Write a message...",
      "form__text__maxlength": 100000,
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
      "modal__block__text": "Are you sure you want to block @name@?",
      "modal__block__text__multiple": "Who would you like to block?",
      "modal__block__text__not_allowed": "You cannot block this user.",
      "modal__unblock__heading": "Unblock user",
      "modal__unblock__text": "Are you sure you want to unblock @name@?",
      "modal__unblock__text__multiple": "Users I want to unblock:",
      "modal__unblock__text__not_allowed": "You cannot unblock this user.",
      "modal__error__heading": "Error",
      "error__no_connection": "We're having trouble contacting the server, are you connected to the internet?",
      "error__api_bad_response": "The API returned an error so something has gone wrong.",
      "error__show_text": "Show the error",
      "error__hide_text": "Hide the error",
      "error__details": "@status@: @error@."
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

  this.idleIntervals = function(){
    var idleIntervals = Object.keys(appSettings.poll_intervals).map(function(x) {
      if(!isNaN(x)){
        return x * 60;
      }
    });
    idleIntervals = idleIntervals.filter(function(x){return !isNaN(x) && x > 0}).sort(function compareNumbers(a, b) {
      return a - b;
    });
    return idleIntervals;
  }

  this.defaultPollingIntervals = function(){
    return appSettings.poll_intervals["0"];
  }


  this.nextIdleInterval = function(current){
    var idleIntervals = this.idleIntervals();
    var lastInterval = idleIntervals[idleIntervals.length - 1];

    idleIntervals = idleIntervals.filter(function(x){return x <= current}).sort(function compareNumbers(a, b) {
      return a - b;
    });

    if(idleIntervals.length > 0){
      return idleIntervals[idleIntervals.length-1];
    } else {
      return lastInterval;
    }
  }

  this.getPollingIntervals = function(current){
    var currentKey = current/60;
    return appSettings.poll_intervals[currentKey];
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
      getString: self.getString,
      idleIntervals: self.idleIntervals,
      nextIdleInterval: self.nextIdleInterval,
      getPollingIntervals: self.getPollingIntervals,
      defaultPollingIntervals: self.defaultPollingIntervals
    }
  }
});
