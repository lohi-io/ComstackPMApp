var app = angular.module('ComstackPmApp', ['ui.router']);
app.config([
        "$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider
                .otherwise("/");

            $stateProvider
                .state('inbox',{
                    url: '/',
                    controller: 'InboxCtrl',
                    templateUrl: '/app/html/inbox.html'
                });
        }
    ]
);







