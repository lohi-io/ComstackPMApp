var app = angular.module('ComstackPMApp', ['ui.router', 'ComstackPMApp.Services']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//
//}]);
app.config([
  "$urlRouterProvider",
  "$stateProvider", function ($urlRouterProvider, $stateProvider) {


    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = "";
    var templatesPath = "";

    for (var i = 0; i < scripts.length - 1; i++) {
      console.log(scripts[i]);
      if (scripts[i].src.indexOf("ComstackPMApp.js") != -1){
        currentScriptPath = scripts[i].src;
      }
    }
    if(currentScriptPath !== ""){
      templatesPath = currentScriptPath.substring(0, currentScriptPath.indexOf('/js/'))+'/';
    }

    console.log(templatesPath + 'html/home.html');



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
      });
  }
]);
