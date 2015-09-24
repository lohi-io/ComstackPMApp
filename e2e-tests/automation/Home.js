/**
 * Created by fechit01 on 16/09/2015.
 */
var PageBase = require('./PageBase.js');

module.exports = function () {
    PageBase.call(this);

    this.get = function () {
        browser.get('/app');
    }

    this.message = function(){
      var div = element.all(by.tagName('div')).first();
      return div.getText();
    }

};
