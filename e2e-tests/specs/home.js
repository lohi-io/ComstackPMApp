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
      browser.get('https://CRUK01:yuDab8ne!@cancerchat01dev.prod.acquia-sites.com');
      inboxPage = homePage.inbox();
    }
  });

  it('Should display correct title', function () {
    expect(homePage.title()).toEqual('Cancer Chat');
  });

  it('Should display messages', function(){
    expect(inboxPage.heading()).toEqual('Messages');
  });
});
