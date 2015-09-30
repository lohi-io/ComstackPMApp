var app = angular.module('ComstackPMApp', ['ui.router', 'ComstackPMApp.Services', 'luegg.directives']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//
//}]);
app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', function ($urlRouterProvider, $stateProvider, configurationServiceProvider) {


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
      .state('conversation', {
        url: '/conversation/:id',
        controller: 'ConversationCtrl',
        templateUrl: templatesPath+'/app/html/conversation.html'
      });
  }
]);
