/**
 * Created by fechit01 on 16/09/2015.
 */
var PageBase = require('./PageBase.js');

module.exports = function () {
  PageBase.call(this);

  var messageLink = element(by.css('.messages-trigger'));
  var messages = element.all(by.css('.cs-pm-conversation'));

  this.heading = function(){
    return messageLink.getText();
  };

  this.messageCount = function(){
    return messages.count();
  }




  //this.messageContainer = function(){
  //  return return element(by.id('messages'));
  //}
  //
  //this.messagesList = function(){
  //  return return element(by.css('media-list conversations-list'));

  //this.messages = function(){
  //  return return element(by.css(' cs-pm-conversation'));
  //}


  //}

};
