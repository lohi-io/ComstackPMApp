var app = angular.module('ComstackPmApp', ['ui.router', 'ComstackPmApp.Services']);

app.config([
        "$urlRouterProvider",
        "$stateProvider", function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider
                .otherwise("/1");

            $stateProvider
                .state('inbox',{
                    url: '/:page',
                    controller: 'InboxCtrl',
                    resolve: {
                      currentUser: ['GetCurrentUser', function (GetCurrentUser) { return GetCurrentUser(); }],
                      conversations : ['GetConversations', '$stateParams', function (GetConversations, $stateParams)
                          {
                              return GetConversations($stateParams.page);
                          }
                      ],
                    },
                    templateUrl: 'html/inbox.html'
                });

    }
]);

app.config(['$httpProvider', function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
}
]);







