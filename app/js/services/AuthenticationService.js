//**
// * Created by fechit01 on 11/09/2015.
// */
(function(angular)
{
'use strict';
var services = angular.module('ComstackPMApp.Services');

services.factory('Authentication', ['$http', '$q', 'ConfigurationService',
    function($http, $q, config){
      var settings = config.get();
      var auth = atob(settings.authorization_header.replace('Basic ', ''));
      var baseUrl = settings.base_url.replace('https://', 'https://'+auth+'@');

        var formLogin = function(){
            var deferred = $q.defer();

            console.log("Starting form auth...");
            var url = baseUrl+'/home?destination=home';
            var data = "name=basic_user_1&login-do=yes&pass=password&form_id=user_login_block&op=Sign+in"

            $http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response)
            {
                console.log("Succeeded form auth...");
                deferred.resolve(response);
            }).error(function(err, status)
            {
                console.log("Failed form auth...");
                deferred.reject(err);
            });


            return deferred.promise;
        };

        var basicAuth = function()
        {
            var deferred = $q.defer();
            console.log("Starting basic auth...");
            $http.get(baseUrl, {}
            ).success(function (response)
            {
                console.log("Succeeded basic auth...");
                deferred.resolve(response);

            }).error(function(err, status)
            {
                console.log("Failed basic auth...");
                deferred.reject(err);

            });
            return deferred.promise;
        };


        var getToken = function(){
            var deferred = $q.defer();
            console.log("Starting get token...");
            $http.get(baseUrl+'/api/login-token', {}).success(function (response)
            {
                console.log("Succeeded get token...");
                deferred.resolve(response);

            }).error(function(err, status)
            {
                console.log("Failed basic auth...");
                deferred.reject(err);

            });

            return deferred.promise;

        }


        var apiLogin = function(){
            var deferred = $q.defer();

            basicAuth().then(function(response)
                {
                    console.log("Succeeded basic auth...");
                    formLogin().then(function(response){
                        console.log("Succeeded form auth...");
                        getToken().then(function(response){
                            console.log("Succeeded get token...");
                            config.updateAccessToken(response.access_token);
                            deferred.resolve(response);
                        }, function(err){
                            console.log("Failed get token...");
                            console.log(err);
                            deferred.reject(err);
                        });
                    },function(err){
                        console.log("Failed form auth...");
                        console.log(err);
                    });
                },
                function(err)
                {
                    console.log("Failed basic auth...");
                    console.log(err);
                });

            return deferred.promise;
        }

        return {
            apiLogin: apiLogin
        };

}
]);
})(angular);

