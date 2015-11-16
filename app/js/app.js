var templates = angular.module('ComstackPMApp.Templates', []);

var app = angular.module('ComstackPMApp', ['ui.router',
                                           'ui.bootstrap',
                                           'ComstackPMApp.Services',
                                           'ngTagsInput',
                                           'luegg.directives',
                                           'emguo.poller',
                                           'ui.scroll',
                                           'ui.scroll.jqlite',
                                           'ComstackPMApp.Directives',
                                           'ComstackPMApp.Templates']);

app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', '$httpProvider', 'tagsInputConfigProvider', 'pollerConfig', '$logProvider',
  function ($urlRouterProvider, $stateProvider, configurationServiceProvider, $httpProvider, tagsInputConfigProvider, pollerConfig, $logProvider) {


    var settings = configurationServiceProvider.get();

    tagsInputConfigProvider.setDefaults('tagsInput', {placeholder: ''});
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', {placeholder: true});
    pollerConfig.resetOnStateChange = true;
    $httpProvider.interceptors.push('requestInterceptor');
    $logProvider.debugEnabled(settings.debug_mode);

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
        url: '/inbox/:page',
        controller: 'InboxCtrl',
        templateUrl: 'html/inbox.html'
      })
      .state('message', {
        url: '/message/:userId',
        controller: 'MessageCtrl',
        templateUrl: 'html/message.html'
      })
      .state('conversation', {
        url: '/conversation/:id',
        controller: 'ConversationCtrl',
        templateUrl: 'html/conversation.html'
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
