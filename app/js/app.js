var app = angular.module('ComstackPmApp', ['ui.router', 'ComstackPmApp.Services']);

app.config([
        "$urlRouterProvider",
        "$stateProvider", function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider
                .otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    controller: 'HomeCtrl',
                    templateUrl: "html/home.html"
                })
                .state('inbox',{
                    url: '/Inbox',
                    controller: 'InboxCtrl',
                    resolve: {
                      currentUser: ['GetCurrentUser', function (GetCurrentUser) { return GetCurrentUser(); }],
                      conversations : ['GetConversations', function (GetConversations) { return GetConversations(); }],
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







