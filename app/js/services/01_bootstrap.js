/**
 * Created by fechit01 on 11/09/2015.
 */
'use strict';
var serviceModule = angular.module('ComstackPmApp.Services', ['ngResource']);

serviceModule.constant(
  'ApiUrl',
  'https://test.cancerresearchuk.org/about-cancer/cancer-chat/api/v1');
serviceModule.value(
  'AccessToken',
  '');



serviceModule.config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.common.Authorization = "Basic Q1JVSzAxOnl1RGFiOG5lIQ==";
   // $httpProvider.interceptors.push('AuthInterceptor');
}

]);

