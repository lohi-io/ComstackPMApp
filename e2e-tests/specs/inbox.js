var HomePage = require('../automation/HomePage.js');
var request = require('request');


describe('Inbox Page - basic_user_1', function () {
  var inboxPage, homePage;

  beforeEach(function () {
    return browser.ignoreSynchronization = true;
  });

  beforeEach(function () {
    if (!homePage) {
      homePage = new HomePage();
      inboxPage = homePage.signIn('basic_user_1', 'password');
    }
  });

  it('Should display 10 conversations', function () {
    return browser.ignoreSynchronization = false;
    browser.waitForAngular();
    expect(inboxPage.messageCount()).toEqual(10);
  });

  it('Should display 10 avatarts', function () {
    return browser.ignoreSynchronization = false;
    browser.waitForAngular();
    expect(inboxPage.avatarsCount()).toEqual(10);
  });


  it('Should have the new message button displayed', function () {
    return browser.ignoreSynchronization = false;
    browser.waitForAngular();
    expect(inboxPage.newMessageLink().getInnerHtml()).toEqual('New message');
    expect(inboxPage.newMessageLink().isDisplayed()).toBeTruthy();
  });

  it('Should not display the read only message', function () {
    return browser.ignoreSynchronization = false;
    browser.waitForAngular();
    expect(inboxPage.readOnlyAlertIsDisplayed()).toBeFalsy();
  });

  it('Should not display the empty inbox message', function () {
    return browser.ignoreSynchronization = false;
    browser.waitForAngular();
    expect(inboxPage.noConversationsAlertIsDisplayed()).toBeFalsy();
  });




});
