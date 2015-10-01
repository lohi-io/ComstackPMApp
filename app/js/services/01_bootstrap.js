/**
 * Created by fechit01 on 11/09/2015.
 */
'use strict';
var serviceModule = angular.module('ComstackPMApp.Services', ['ngResource']);

serviceModule.config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.post['X-CSRFToken'] = 'wxQbqDICGYiI-WzxNAE_dZsgFT3vl3uenImPkjQx55I';

    //$httpProvider.defaults.headers.common.Authorization = "Basic Q1JVSzAxOnl1RGFiOG5lIQ==";
   // $httpProvider.interceptors.push('AuthInterceptor');
}

]);

