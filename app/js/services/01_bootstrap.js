(function(angular) {
  'use strict';

  var serviceModule = angular.module('ComstackPmApp.Services', ['ngResource']);
  serviceModule.constant(
    'ApiUrl',
    'https://cancerchat01dev.prod.acquia-sites.com/api/v1');
  serviceModule.constant(
    'AccessToken',
    'qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc');
})(angular);
