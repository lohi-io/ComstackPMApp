module.exports = function(config){

    'use strict';

  config.set({

    basePath : './',

    files : [
        'bower_components/angular/angular.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'app/js/app.js',
        'app/js/services/*.js',
        'app/js/controllers/*.js',
        'app/js/filters/*.js',
        'specs/**/*.js'

    ],
    //exclude:['app/js/pcg.tpls.js'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-story-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

      reporters:['story']

  });
};
