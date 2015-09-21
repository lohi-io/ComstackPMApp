'use strict';
var module = angular.module('ComstackPmApp.Services');

module.factory('AuthInterceptor',
    [function ()
    {
        return {
            request: function (config)
            {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Basic Q1JVSzAxOnl1RGFiOG5lIQ=='
                return config;
            }
        };
    }]);

/**
 * Created by fechit01 on 18/09/2015.
 */
