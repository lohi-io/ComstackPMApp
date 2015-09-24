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
      browser.get('https://CRUK01:yuDab8ne!@test.cancerresearchuk.org/about-cancer/cancer-chat');
      homePage.get();
    }

  });

  it('Should display correct title', function () {
    // browser.pause();
    expect(homePage.title()).toEqual('Cancer Chat');
  });

  it('Should display correct messasge', function () {
    expect(homePage.message()).toEqual('Loading please wait...');
  });


  //it('change page and current url', function() {
  //  ptor.findElement(protractor.By.className('.button').click().then(function() {
  //    ptor.waitForAngular();
  //    expect(ptor.currentUrl()).toContain('#/new_page');
  //  });
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
