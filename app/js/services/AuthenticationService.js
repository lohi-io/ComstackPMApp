///**
// * Created by fechit01 on 11/09/2015.
// */
//'use strict';
//var module = angular.module('ComstackPmApp.Services');
//
//module.factory('AuthenticationService', ['$resource', function ($resource) {
//    var url = module.settings.api_url+'login-token';
//
//    function errorAsDialog(response, responseError) {
//        if (responseError) {
//           // modals.httpErrorCallback(responseError);
//            console.log(responseError);
//        }
//    }
//
//    var authenticationService = $resource("", {},
//        {
//            getToken: { method: "GET", url: url, interceptor: errorAsDialog },
//            isAuthenticated: module.settings.access_token != ''
//        });
//
//    return authenticationService;
//}]);
