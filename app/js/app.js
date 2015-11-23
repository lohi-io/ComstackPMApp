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
                                           'ComstackPMApp.Templates',
                                           'ngIdle']);

app.run(['$rootScope', '$log', 'Idle', 'configurationService', 'poller', 'Conversation', 'User', 'Message', '$state', '$filter', '$interval',
  function($rootScope, $log, Idle, configurationService, poller, Conversation, User, Message, $state, $filter, $interval){

  Idle.watch();

  $rootScope.pollers = [];
  $rootScope.countingIdle = {};
  $rootScope.idleCount = 0;
  $rootScope.currentIdle = Idle.getIdle();

  $log.debug(Date());
  $log.debug($rootScope.currentIdle);


  $rootScope.$on('IdleStart', function() {
    // the user appears to have gone idle
    $log.debug('IdleStart '+Date());
    $log.debug($rootScope.pollers);
    idleRun();

    $rootScope.countingIdle = $interval(function() {
      $log.debug('Interval Run');
      idleRun();
    }, $rootScope.currentIdle * 1000);

  });

  $rootScope.$on('IdleEnd', function() {
    // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    $log.debug('IdleEnd '+Date());
    $rootScope.idleCount = 0;
    $interval.cancel($rootScope.countingIdle);
    schedulePollers(configurationService.defaultPollingIntervals());
  });

  function idleRun(){
    $rootScope.idleCount++;
    var nextIdle = getNextIdle();
    $log.debug('Next idle'+nextIdle);
    if(nextIdle != $rootScope.currentIdle){
      schedulePollers(configurationService.getPollingIntervals(nextIdle));
    }
  }

  function getNextIdle(){
    return configurationService.nextIdleInterval($rootScope.currentIdle * $rootScope.idleCount);
  }

  function schedulePollers(pollIntervals){
    $log.debug('Schedule pollers');
    $log.debug(pollIntervals);

    if(checkPollerStarted('Conversation')){
      $log.debug('Reschedule Conversation ' + pollIntervals.conversations);
      poller.get(Conversation, {
        delay: pollIntervals.conversations * 1000
      });
    }

    if(checkPollerStarted('Message')) {
      $log.debug('Reschedule Message ' + pollIntervals.messages);
      poller.get(Message, {
        delay: pollIntervals.messages * 1000
      });
    }
    if(checkPollerStarted('User')) {
      $log.debug('User ' + pollIntervals.user_is_available);
      poller.get(User, {
        delay: pollIntervals.user_is_available * 1000,
      });
    }

    $log.debug(poller);
  }

  function checkPollerStarted(name){
    var found = $filter('filter')($rootScope.pollers, {name: name});
    found = $filter('filter')(found, {state: $state.current.name});
    if(found.length == 0 ){
        return false;
    }
    return found[0].started;
  }
}]);

app.config([
  "$urlRouterProvider",
  "$stateProvider", 'configurationServiceProvider', '$httpProvider', 'tagsInputConfigProvider', 'pollerConfig', '$logProvider', 'IdleProvider',
  function ($urlRouterProvider, $stateProvider, configurationServiceProvider, $httpProvider, tagsInputConfigProvider, pollerConfig, $logProvider, IdleProvider) {

    var settings = configurationServiceProvider.get();

    tagsInputConfigProvider.setDefaults('tagsInput', {placeholder: ''});
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', {placeholder: true});
    pollerConfig.resetOnStateChange = true;
    $httpProvider.interceptors.push('requestInterceptor');
    $logProvider.debugEnabled(settings.debug_mode);
    var idleIntervals = configurationServiceProvider.idleIntervals();
    IdleProvider.idle(idleIntervals[0]);
    IdleProvider.timeout(false);

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
