var app = angular.module('ComstackPMApp', ['ui.router', 'ui.bootstrap', 'ComstackPMApp.Services', 'ngTagsInput', 'luegg.directives']);
//app.run(["$rootScope", "ConfigurationService", function ($rootScope, config) {
//
//}]);
app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', function ($urlRouterProvider, $stateProvider, configurationServiceProvider) {


    var settings = configurationServiceProvider.get();
    var templatesPath = settings.library_path;
    var environment = settings.environment;


    switch (environment) {
      case 'local':
        $urlRouterProvider
          .otherwise("/home");
        break;
      default:
        $urlRouterProvider
          .otherwise("/inbox/1");
        break;
    }

    $stateProvider
      .state('Home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: templatesPath + '/app/html/home.html'
      })
      .state('inbox', {
        url: '/inbox/:page',
        controller: 'InboxCtrl',
        templateUrl: templatesPath + '/app/html/inbox.html'
      })
      .state('message', {
        url: '/message',
        controller: 'MessageCtrl',
        templateUrl: templatesPath + '/app/html/message.html'
      })
      .state('conversation', {
        url: '/conversation/:id',
        controller: 'ConversationCtrl',
        templateUrl: templatesPath + '/app/html/conversation.html'
      })
      .state('inbox.delete',
        {
          url: '/delete/:id',
          onEnter: [
            'deleteConversationState', '$stateParams', function (deleteConversationState, $stateParams) {
              deleteConversationState.activate(templatesPath + '/app/html/deleteConversation.html',
                {state: 'inbox', params: $stateParams},
                {state: 'inbox', params: $stateParams}
              );
            }
          ]
        })
      .state('conversation.delete',
        {
          url: '/delete',
          onEnter: [
            'deleteConversationState', '$stateParams', function (deleteConversationState, $stateParams) {
              deleteConversationState.activate(templatesPath + '/app/html/deleteConversation.html',
                {state: 'inbox', params: {page: 1}},
                {state: 'conversation', params: $stateParams}
              );
            }
          ]
        })
      .state('inbox.report',
        {
          url: '/report/:id',
          onEnter: [
            'reportConversationState', '$stateParams', function (reportConversationState, $stateParams) {
              reportConversationState.activate(templatesPath + '/app/html/reportConversation.html',
                {state: 'inbox', params: $stateParams},
                {state: 'inbox', params: $stateParams}
              );
            }
          ]
        })
      .state('conversation.report',
        {
          url: '/report',
          onEnter: [
            'reportConversationState', '$stateParams', function (reportConversationState, $stateParams) {
              reportConversationState.activate(templatesPath + '/app/html/reportConversation.html',
                {state: 'inbox', params: {page: 1}},
                {state: 'conversation', params: $stateParams}
              );
            }
          ]
        })
      .state('conversation.block',
        {
          url: '/block',
          onEnter: [
            'blockUserState', '$stateParams', function (blockUserState, $stateParams) {
              blockUserState.activate(templatesPath + '/app/html/blockUser.html',
                {state: 'conversation', params: $stateParams},
                {state: 'conversation', params: $stateParams}
              );
            }
          ]
        });
  }
]);
