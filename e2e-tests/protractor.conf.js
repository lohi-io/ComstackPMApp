exports.config = {
  allScriptsTimeout: 11000,

  specs: ['specs/*.js'],

  capabilities: {
    'browserName': 'chrome',
    chromeOptions : {
    }
  },

  baseUrl: 'http://cancerchatdev.localweb:8000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },





    onPrepare: function () {
    var specReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new specReporter({ displayStacktrace: true }));

    //require('jasmine-reporters');
    //jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('results/', true, true));
    //
    //var htmlReporter = require('protractor-html-screenshot-reporter');
    //jasmine.getEnv().addReporter(new htmlReporter({baseDirectory: 'screenshots'}));
  }

};


