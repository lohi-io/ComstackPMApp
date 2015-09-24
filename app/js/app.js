var app = angular.module('ComstackPMApp', ['ui.router', 'ComstackPMApp.Services']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//
//}]);
app.config([
  "$urlRouterProvider",
  "$stateProvider", function($urlRouterProvider, $stateProvider) {

    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length-1].src;
    var templatesPath = currentScriptPath.substring(0, currentScriptPath.indexOf('/js/'));
    console.log(templatesPath);

    $urlRouterProvider
      .otherwise("/home");
    $stateProvider
      .state('Home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: templatesPath+'/html/home.html'
      })

      .state('inbox',{
        url: '/inbox/:page',
        controller: 'InboxCtrl',
        templateUrl: templatesPath+'/html/inbox.html'
      });
  }
]);
