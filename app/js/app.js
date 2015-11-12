var templates = angular.module('ComstackPMApp.Templates', []);

var app = angular.module('ComstackPMApp', ['ui.router',
                                           'ui.bootstrap',
                                           'ComstackPMApp.Services',
                                           'ngTagsInput',
                                           'luegg.directives',
                                           'emguo.poller',
                                           'ui.scroll',
                                           'ui.scroll.jqlite',
                                           'focus-if',
                                           'ComstackPMApp.Directives',
                                           'ComstackPMApp.Templates']);

app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', '$httpProvider', 'tagsInputConfigProvider', function ($urlRouterProvider, $stateProvider, configurationServiceProvider, $httpProvider, tagsInputConfigProvider) {

    tagsInputConfigProvider.setDefaults('tagsInput', {placeholder: ''});
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', {placeholder: true});

    $httpProvider.interceptors.push('requestInterceptor');

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
        templateUrl: 'html/home.html'
      })
      .state('inbox', {
        url: '/inbox/:page?reported',
        controller: 'InboxCtrl',
        templateUrl: 'html/inbox.html'
      })
      .state('message', {
        url: '/message/:userId',
        controller: 'MessageCtrl',
        templateUrl: 'html/message.html'
      })
      .state('conversation', {
        url: '/conversation/:id?reported',
        controller: 'ConversationCtrl',
        templateUrl: 'html/conversation.html'
      })
      .state('test', {
        url: '/test/:id',
        controller: 'TestCtrl',
        templateUrl: 'html/test.html'
      })
      .state('inbox.delete',
        {
          url: '/delete/:id',
          onEnter: [
            'deleteConversationState', '$stateParams', function (deleteConversationState, $stateParams) {
              deleteConversationState.activate('html/deleteConversation.html',
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
              deleteConversationState.activate('html/deleteConversation.html',
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
              reportConversationState.activate('html/reportConversation.html',
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
              reportConversationState.activate('html/reportConversation.html',
                {state: 'conversation', params: $stateParams},
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
              blockUserState.activate('html/blockUser.html',
                {state: 'conversation', params: $stateParams},
                {state: 'conversation', params: $stateParams}
              );
            }
          ]
        })
      .state('conversation.unblock',
        {
          url: '/unblock',
          onEnter: [
            'unblockUserState', '$stateParams', function (unblockUserState, $stateParams) {
              unblockUserState.activate('html/unblockUser.html',
                {state: 'conversation', params: $stateParams},
                {state: 'conversation', params: $stateParams}
              );
            }
          ]
        });
  }
]);
