var app = angular.module('ComstackPMApp', ['ui.router', 'ComstackPMApp.Services']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//
//}]);
app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', function ($urlRouterProvider, $stateProvider, configurationServiceProvider) {


    var settings = configurationServiceProvider.get();
    var templatesPath = settings.library_path;

    if(templatesPath !== ""){
      templatesPath += '/';
    }

    $urlRouterProvider
      .otherwise("/home");
    $stateProvider
      .state('Home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: templatesPath+'html/home.html'
      })
      .state('inbox', {
        url: '/inbox/:page',
        controller: 'InboxCtrl',
        templateUrl: templatesPath+'html/inbox.html'
      })
      .state('message', {
        url: '/message',
        controller: 'MessageCtrl',
        templateUrl: templatesPath+'html/message.html'
      })
      .state('conversation', {
        url: '/conversation/:id',
        controller: 'ConversationCtrl',
        templateUrl: templatesPath+'html/conversation.html'
      });
  }
]);
