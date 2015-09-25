/**
 * Created by fechit01 on 16/09/2015.
 */

var HomePage = require('../automation/Home.js');
var request = require('request');


describe('ComstackPmApp', function () {
  var homePage;

  beforeEach(function () {
    return browser.ignoreSynchronization = true;
  });

  beforeEach(function () {
    if (!homePage) {
      homePage = new HomePage();
      browser.get('https://CRUK01:yuDab8ne!@cancerchat01dev.prod.acquia-sites.com');
      homePage.get();
    }

  });

  it('Should display correct title', function () {
    // browser.pause();
    expect(homePage.title()).toEqual('Cancer Chat');
  });

  it('Should display correct message', function () {
    expect(homePage.loginWait().getText()).toEqual('Login please wait...');
  });

  //it('change page and current url', function() {
  //
  //  element(by.id('loginDone')).then(function(){
  //    expect(browser.getCurrentUrl()).toEqual('/inbox/1')
  //  });
  //
  //  //browser.wait(function() {
  //  //  return homePage.loginDone().isDisplayed();
  //  //}, 30000);
  //
  //  //expect(browser.getCurrentUrl()).toEqual('/inbox/1');
  //
  //});

  //it('Should provide ability to return to home page', function(){
  //    expect(homePage.homeLink.isPresent()).toBe(true);
  //});
  //
  //it('Should provide ability to view about page', function(){
  //    expect(homePage.aboutLink.isPresent()).toBe(true);
  //});
  //
  //it('Should provide ability to initiate sign in', function(){
  //    expect(homePage.signInButton.isPresent()).toBe(true);
  //});
  //
  //it('Should open sign in dialog when sign in initiated', function(){
  //    var signInDialog = homePage.signIn();
  //    expect(signInDialog).toBeDefined();
  //    expect(signInDialog instanceof SignInDialog).toBeTruthy();
  //});
});
