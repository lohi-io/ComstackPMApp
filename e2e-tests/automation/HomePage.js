/**
 * Created by fechit01 on 16/09/2015.
 */
var PageBase = require('./PageBase.js');
var InboxPage = require('./InboxPage.js');

module.exports = function () {
  PageBase.call(this);
  var loginWait = element(by.id('loginWait'));

  this.inbox = function () {
    browser.get('https://CRUK01:yuDab8ne!@cancerchat01dev.prod.acquia-sites.com');
    browser.get('/app');
    var EC = protractor.ExpectedConditions;
    browser.driver.wait(EC.presenceOf(element(by.css('.messages-trigger'))),30000);
    return new InboxPage();
  }

  this.loginWaitMessage = function () {
    return  loginWait.getText();
  }

  this.loginDone = function () {
    return element(by.id('loginDone'));
  }


};
