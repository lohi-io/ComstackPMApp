var HomePage = require('../automation/HomePage.js');
var request = require('request');


describe('Inbox Page', function () {
  var inboxPage, homePage;

  beforeEach(function () {
    return browser.ignoreSynchronization = true;
  });

  beforeEach(function () {
    if (!homePage) {
      homePage = new HomePage();
      inboxPage = homePage.inbox();
    }
  });

  it('Should display 10 conversations',function(){
      expect(inboxPage.messageCount()).toEqual(10);
  })



});
