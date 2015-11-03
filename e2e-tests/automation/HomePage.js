/**
 * Created by fechit01 on 16/09/2015.
 */
var PageBase = require('./PageBase.js');
var InboxPage = require('./InboxPage.js');

module.exports = function () {

  PageBase.call(this);

  var loginWait = element(by.id('loginWait'));
  var username = element(by.id('username'));
  var password = element(by.id('password'));
  var loginButton = element(by.id('login'));
  var EC = protractor.ExpectedConditions;

  var login = function(usernameTest, passwordTest){
    username.clear();
    password.clear();
    username.sendKeys(usernameTest);
    password.sendKeys(passwordTest);
    loginButton.click();
  }

  this.signIn = function (username, password) {
    browser.get('/app');
    browser.driver.wait(EC.presenceOf(element(by.id('username'))),10000);
    login(username, password);
    browser.driver.wait(EC.presenceOf(element(by.css('.text-center'))),40000);
    return new InboxPage();
  };
};
