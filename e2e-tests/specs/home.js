var HomePage = require('../automation/HomePage.js');
var request = require('request');


describe('ComstackPmApp', function () {
  var homePage, inboxPage;

  beforeEach(function () {
    return browser.ignoreSynchronization = true;
  });

  beforeEach(function () {
    if (!homePage) {
      homePage = new HomePage();
      inboxPage = homePage.signIn('basic_user_1', 'password');

    }
  });

  it('Should display correct title', function () {
    expect(homePage.title()).toEqual('Cancer Chat');
  });

  it('Should display messages', function(){
    return browser.ignoreSynchronization = false;
    browser.waitForAngular();
    expect(inboxPage.heading()).toEqual('Messages');
  });
});
