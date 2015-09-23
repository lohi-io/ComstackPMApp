var app = angular.module('ComstackPMApp', ['ui.router', 'ComstackPMApp.Services']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//  config.getLocalAppSettings();
//}]);
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
        templateUrl: 'html/inbox.html'
      });
  }
]);
