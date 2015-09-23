var app = angular.module('ComstackPmApp', ['ui.router', 'ComstackPmApp.Services']);

app.config([
        "$urlRouterProvider",
        "$stateProvider", function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider
                .otherwise("/home");



            $stateProvider
                .state('Home', {
                    url: '/home',
                    controller: 'HomeCtrl',
                    templateUrl: 'html/home.html'
                })
                .state('inbox',{
                    url: '/inbox/:page',
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

//app.config(['$httpProvider', function ($httpProvider) {
//  delete $httpProvider.defaults.headers.common['X-Requested-With'];
//  $httpProvider.defaults.useXDomain = true;
//  $httpProvider.defaults.withCredentials = true;
//    $httpProvider.interceptors.push('AuthInterceptor');
//    //$httpProvider.defaults.headers.common['Authorization'] = "Basic Q1JVSzAxOnl1RGFiOG5lIQ==";
//}
//]);







