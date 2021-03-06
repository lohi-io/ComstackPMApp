module.exports = function (config) {

  'use strict';

  config.set({

    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-scroll-glue/src/scrollglue.js',
      'bower_components/moment/moment.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angularpoller/angular-poller.js',
      'bower_components/ng-tags-input/ng-tags-input.js',
      'bower_components/angular-ui-scroll/dist/ui-scroll.js',
      'bower_components/angular-ui-scroll/dist/ui-scroll-jqlite.js',
      'bower_components/angularpoller/angular-poller.js',
      'bower_components/ng-focus-if/focusIf.min.js',
      'bower_components/ng-idle/angular-idle.js',



      'app/js/app.js',
      'app/js/directives/*.js',
      'app/js/providers/*.js',
      'app/js/services/*.js',
      'app/js/controllers/*.js',
      'app/js/filters/*.js',
      'specs/**/*.js'

    ],
    //exclude:['app/js/pcg.tpls.js'],

    autoWatch: true,

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    browsers: ['PhantomJS'],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    reporters: ['story']

  });
};
