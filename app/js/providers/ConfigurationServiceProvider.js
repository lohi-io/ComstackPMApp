var app = angular.module('ComstackPMApp');
app.provider("configurationService", function(){

  var appSettings = {
    "base_url": "https://cancerchat01dev.prod.acquia-sites.com",
    "api_url": "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
    "local_host": "cancerchatdev.localweb",
    "authorization_header": "Basic Q1JVSzAxOnl1RGFiOG5lIQ==",
    "access_token": "",
    "csrf_token": "",
    "library_path": "http://cancerchatdev.localweb:8000",
    "max_participants": 2,
    "allow_separate_conversations": false,
    "share_data_storage": true,
    "poll_intervals": {
      "conversations": 30,
      "messages": 15,
      "available_users": 300
    },
    "strings": {
      "heading__messages": "Messages",
      "heading__conversation_with": "Conversation with @name",
      "text__last_message": "Last message",
      "text__no_available_users": "",
      "text__read_only": "You're currently opted out of private @name@ messaging, <a href='https://blah.com/user/account/@user_id@'>click here</a> to go the the account settings form.",
      "text__select_messages_to_delete": "Select the messages you'd like to delete",
      "text__select_messages_to_report": "Select the messages you'd like to report",
      "form__new_conversation__header": "You must be friends with a person before you can send them messages. <a href='https://blah.com/user/account/@user_id'>Find and add friends</a>",
      "form__to__label": "To",
      "form__to__placeholder__singular": "Enter recipients username...",
      "form__to__placeholder__plural": "Enter recipients username...",
      "form__text__placeholder [validation???]": "Write a message...",
      "form__new_conversation__submit": "Send",
      "form__reply__placeholder": "Enter your reply...",
      "form__reply__submit": "Reply",
      "form__report__label": "Reason for reporting",
      "form__report__submit": "Report",
      "link__delete": "Delete",
      "link__report": "Report",
      "link__block": "Block",
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
      "modal__block__text": "Are you sure you want to block this user?"
    }
  };

  if (typeof Comstack != "undefined") {
    if (typeof Comstack.PMApp != "undefined") {
      if (typeof Comstack.PMApp.Settings != "undefined") {
        angular.merge(appSettings, Comstack.PMApp.Settings)
      }
    }
  }

  this.updateAccessToken = function(token){
    appSettings.access_token = token;
  };

  this.get = function () {
    return appSettings;
  };

  this.set = function (data) {
    appSettings = data;
  };

  this.getString = function(name, values){

    var regExp = /@(\w*)@/gi;
    return appSettings.strings[name].replace(regExp, function(match) {
      match = match.replace(/@/gi,'');
      return values[match];
    });
  }

  this.appSettings = appSettings;
  var self = this;

  this.$get = function(){
    return {
      appSettings: self.appSettings,
      get: self.get,
      set: self.set,
      updateAccessToken: self.updateAccessToken,
      getString: self.getString
    }
  }





});
