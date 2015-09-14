var app = angular.module('ComstackPmApp', ['ui.router']);
app.config([
        "$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider
                .otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "/app/html/home.html"
                })
                .state('inbox',{
                    url: '/Inbox',
                    controller: 'InboxCtrl',
                    templateUrl: '/app/html/inbox.html'
                });
        }
    ]
);







