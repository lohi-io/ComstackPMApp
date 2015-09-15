/**
 * Created by fechit01 on 15/09/2015.
 */
var services = angular.module('ComstackPmApp.Services');

services.factory('Conversation', [
    '$resource', 'ApiUrl', 'AccessToken',
    function($resource,ApiUrl,AccessToken)
    {
        return $resource('/cs-pm/conversations',{}
            ,{
                get: {
                    method: 'GET',
                    url: ApiUrl +'/cs-pm/conversations?access_token='+AccessToken,
                    isArray: false
                }
            }
        );
    }
]);

services.factory('GetConversations', [
    'Conversation', '$q', function(Conversation, $q)
    {
        return function()
        {
            var delay = $q.defer();
            Conversation.get(
                function (conversation) { delay.resolve(conversation); },
                function() { delay.reject("Unable to fetch the conversation"); });
            return delay.promise;
        };
    }
]);