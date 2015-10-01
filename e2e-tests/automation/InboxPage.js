/**
 * Created by fechit01 on 16/09/2015.
 */
var PageBase = require('./PageBase.js');

module.exports = function () {
  PageBase.call(this);

  var messageLink = element(by.css('.messages-trigger'));
  var messages = element.all(by.css('.media-list conversations-list li'));
  var newMessageLink = element(by.binding('button_new_conversation'));
  var readOnlyAlert = element(by.binding('text_read_only'));
  var noConversationsAlert = element(by.binding('text_no_conversations'));
  var avatars = element.all(by.css('.media-object'));


  this.heading = function(){
    return messageLink.getText();
  };

  this.messageCount = function(){
    return messages.count();
  };

  this.newMessageLink = function(){
    return newMessageLink;
  };

  this.readOnlyAlertMessage = function(){
    return readOnlyAlert.getText();
  };

  this.readOnlyAlertIsDisplayed = function(){
    return readOnlyAlert.isDisplayed();
  };

  this.noConversationsAlertMessage = function(){
    return noConversationsAlert.getText();
  };

  this.noConversationsAlertIsDisplayed = function(){
    return noConversationsAlert.isDisplayed();
  };

  this.avatarsCount = function(){
    return avatars.count();
  }



};
