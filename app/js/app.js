var app = angular.module('ComstackPMApp', ['ui.router', 'ui.bootstrap', 'ComstackPMApp.Services','ngTagsInput']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//
//}]);
app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, configurationServiceProvider, $httpProvider) {


    var settings = configurationServiceProvider.get();
    var templatesPath = settings.library_path;

    $urlRouterProvider
      .otherwise("/home");
    $stateProvider
      .state('Home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: templatesPath+'/app/html/home.html'
      })
      .state('inbox', {
        url: '/inbox/:page',
        controller: 'InboxCtrl',
        templateUrl: templatesPath+'/app/html/inbox.html'
      })
      .state('message', {
        url: '/message',
        controller: 'MessageCtrl',
        templateUrl: templatesPath+'/app/html/message.html'
      })

    ;
  }
]);

