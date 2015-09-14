/**
 * Created by fechit01 on 11/09/2015.
 */
var module = angular.module('ComstackPmApp.Services');

module.factory('SettingsService', ['$resource', function ($resource) {

    var url = "";
    function errorAsDialog(response, responseError) {
        if (responseError) {
            console.log(responseError);
           // modals.httpErrorCallback(responseError);
        }
    }

    var settingsService = $resource("", {},
        {
            'get': { method: "GET", url: url, interceptor: errorAsDialog }
        });

    return settingsService;
}]);