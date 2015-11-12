(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn) {
  'use strict';

  describe('ConversationCtrl', function () {
    var scope, currentUser, messages, conversation, state, stateParams, configurationService;
    var urlUser, urlConversation, urlMessages, urlAvailableUsers, urlBlockedUsers;
    var $httpBackend, requiresHttp, timeout, urlPoller, urlMarkAsRead, $q, deferred, poller, messagePoller, blockedUsers;
    var urlApi, queryString, accessToken, availabilityPoller;

    var contact, availableUsers, $window;

    beforeEach(angular.mock.module('ComstackPMApp'));
    beforeEach(angular.mock.module('ComstackPMApp.ServicesMock'));

    beforeEach(inject(function (_$rootScope_, $controller, _configurationService_, _$httpBackend_, _$timeout_, _$q_) {
      currentUser = {
        user: {
          id: 1,
          name: 'Alice'
        }
      };
      messages = {
        data: ['My conversation messages']
      };

      contact = {
        user: {
          id: 2,
          name: 'Bob'
        }
      };
      availableUsers = {
        data: [
          contact.user
        ]
      };

      blockedUsers = {
        data: [
          {
            id: 3,
            name: 'Alex'
          }
        ]
      };
      conversation = {
        data: {
          id: 123,
          participants: [
            currentUser.user,
            contact.user
          ]
        }
      };
      configurationService = _configurationService_;

      $httpBackend = _$httpBackend_;
      $q = _$q_;
      timeout = _$timeout_;
      $window = {isMobile: {any : false}};
      requiresHttp = true;
      stateParams = {id: conversation.data.id};
      scope = _$rootScope_.$new();

      state = {
        go: function() {
          // stub method
        }
      };

      deferred = $q.defer();

      messagePoller =
      {
        delay: 15000,
        deferred: deferred,
        promise: {then: function(){
           deferred.resolve({data:[{id:10, text:"gsgdf"}, {id:20, text:""}]});
           return deferred.promise}},
        smart: true
      };


      availabilityPoller =  {
        delay: 15000,
        deferred: deferred,
        promise: {then: function(){
          deferred.resolve(blockedUsers);
          return deferred.promise}},
        smart: true
      };


      poller = {
        'get': function() {
            return availabilityPoller;
        }
      };



      deferred.resolve();
      //scope.$root.$digest();


      /* eslint-disable max-len */

      accessToken = configurationService.getSetting('access_token');
      urlApi = configurationService.getSetting('api_url');

      stateParams = {id: 123};

      urlUser = urlApi+'/cs-pm/users/current-user?access_token='+accessToken;

      urlConversation = urlApi+'/cs-pm/conversations/123?access_token='+accessToken;
      urlPoller = urlApi+'/cs-pm/conversations/123/messages?access_token='+accessToken+'&after=&poll=true&range=50';
      urlMarkAsRead = urlApi+'/cs-pm/conversations/123/mark-as-read?access_token='+accessToken;
      urlAvailableUsers  = urlApi+'/cs-pm/users/available-users?access_token='+accessToken+'&filter%5Bid%5D=2';
      urlBlockedUsers = urlApi+'/cs-fr/blocked?access_token='+accessToken+'&filter%5Buser%5D=2';
      urlMessages = urlApi+'/cs-pm/conversations/123/messages?access_token='+accessToken;

      $httpBackend.expectGET(urlUser).respond({
        data: currentUser
      });
      //$httpBackend.expectGET(urlConversation).respond(conversation);
      //$httpBackend.expectPUT(urlMarkAsRead, {}).respond({});
      //$httpBackend.expectGET(urlMessages+'&after=&before=&range=20').respond(messages);


      /* eslint-enable max-len */
      $controller('ConversationCtrl', {
        $scope: scope,
        $state: state,
        $stateParams: stateParams,
        configurationService: configurationService,
        'poller': poller,
        $window: $window
      });
    }));

    afterEach(function () {
      if (requiresHttp) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
      }
    });

    it('Should call the get of the poller', function(){
        AssumeHttpRequestResponded();
        scope.lastMessageId = 0;
        spyOn(poller,'get').and.callThrough();
        $httpBackend.flush();
        expect(poller.get).toHaveBeenCalled();
        //expect(scope.scrollAdapter.append).toHaveBeenCalledWith([{}, {}]);
    });

    it('Should load in the current user on initialisation', function () {
      AssumeHttpRequestResponded();
      $httpBackend.flush();
      // Let the initial XHRs finish.
      expect(angular.equals(scope.currentUser, currentUser)).toBeTruthy();
    });

    //it('Should detect when the contact is available, assuming they are not blocked', function() {
    //  AssumeHttpRequestResponded();
    //
    //  spyOn(poller,'get').and.callThrough();
    //
    //  expect(scope.isContactBlocked).toEqual(false);
    //
    //  $httpBackend.flush();
    //  expect(scope.isContactAvailable).toEqual(true);
    //  expect(scope.isContactBlocked).toEqual(false);
    //});

    //it('Should detect when the contact is unavailable, assuming they are not blocked', function() {
    //  var unavailableContact = {
    //    id: 2,
    //    name: 'Unavailable'
    //  };
    //  var noAvailableUsers = {
    //    data: []
    //  };
    //  var conversationWithUnavailableContact = {
    //    data: {
    //      id: 1,
    //      participants: [
    //        currentUser.data,
    //        unavailableContact
    //      ]
    //    }
    //  };
    //
    //  $httpBackend.expectGET(urlPoller).respond(messages);
    //  $httpBackend.expectGET(urlConversation).respond(conversationWithUnavailableContact);
    //  $httpBackend.expectPUT(urlMarkAsRead,{}).respond({});
    //  $httpBackend.expectGET(urlBlockedUsers).respond({});
    //  $httpBackend.expectGET(urlAvailableUsers).respond(noAvailableUsers);
    //
    //
    //
    //  // Expect controller defaults which assume user is not available for contact.
    //  expect(scope.isContactAvailable).toEqual(false);
    //  expect(scope.isContactBlocked).toEqual(false);
    //
    //  $httpBackend.flush();
    //  expect(scope.isContactAvailable).toEqual(false);
    //  expect(scope.isContactBlocked).toEqual(false);
    //});
    //
    //it('Should detect when the current user has blocked the contact', function() {
    //  var blockedUser = {
    //    id: 2,
    //    name: 'Blocked'
    //  };
    //  var blockedRelationship = {
    //    data: [
    //      {
    //        type: 'relationship',
    //        id: 1,
    //        relationship_type: 'comstack_blocked',
    //        user: blockedUser
    //      }
    //    ]
    //  };
    //  var conversationWithBlockedUser = {
    //    id: 1,
    //    participants: [
    //      currentUser.data,
    //      blockedUser
    //    ]
    //  };
    //
    //  $httpBackend.expectGET(urlPoller).respond(messages);
    //  $httpBackend.expectGET(urlConversation).respond(conversation);
    //  $httpBackend.expectPUT(urlMarkAsRead,{}).respond({});
    //  $httpBackend.expectGET(urlBlockedUsers).respond(blockedRelationship);
    //  // Expect controller defaults which assume user is not available for contact.
    //  expect(scope.isContactAvailable).toEqual(false);
    //  expect(scope.isContactBlocked).toEqual(false);
    //
    //  $httpBackend.flush();
    //  expect(scope.isContactAvailable).toEqual(false);
    //  expect(scope.isContactBlocked).toEqual(true);
    //});
    //
    //it('Should be able to create a reply to the current conversation, appending it to the messages list', function() {
    //  AssumeHttpRequestResponded();
    //  scope.scrollAdapter = {append: function(){}};
    //  spyOn(scope.scrollAdapter, 'append');
    //
    //
    //  scope.newMessageForm = {
    //    $setPristine: function() {
    //      // stub method
    //    }
    //  };
    //  // Skip the initial AJAX requests.
    //  spyOn(scope.newMessageForm, '$setPristine');
    //
    //  $httpBackend.flush();
    //
    //  scope.reply.text = 'It works';
    //  var urlReplyToConversation = apiUrl+'/cs-pm/conversations/' +
    //    conversation.data.id + '/reply?access_token=';
    //  var newMessage = {
    //    data: [{
    //      id: 1,
    //      conversation_id: conversation.data.id,
    //      text: scope.reply.text
    //    }]
    //  };
    //
    //  $httpBackend.expectPOST(urlReplyToConversation, scope.reply).respond(newMessage);
    //  scope.submitReply();
    //  $httpBackend.flush();
    //
    //  expect(scope.scrollAdapter.append).toHaveBeenCalledWith([newMessage.data[0]]);
    //  expect(scope.newMessageForm.$setPristine).toHaveBeenCalled();
    //  //var lastMessage = scope.messages.data[scope.messages.data.length - 1];
    //  //expect(angular.equals(lastMessage, newMessage.data[0])).toBeTruthy();
    //
    //  expect(scope.reply.text).toEqual('');
    //});
    //
    //it('Should provide a data source for messages', function(){
    //  AssumeHttpRequestResponded();
    //  $httpBackend.flush();
    //  expect(scope.messagesDatasource).toBeDefined();
    //  expect(typeof scope.messagesDatasource.get).toEqual('function');
    //});
    //
    //it('Should load the last message page on index 1', function(){
    //  AssumeHttpRequestResponded();
    //  $httpBackend.flush();
    //  urlMessages += "&after=&before=&range=10";
    //  $httpBackend.expectGET(urlMessages).respond(messages);
    //  var success = function(){};
    //  scope.scrollCalls = 0;
    //
    //  scope.messagesDatasource.get(1,10, success);
    //  timeout.flush();
    //  $httpBackend.expectPUT(urlMarkAsRead,{}).respond({});
    //  $httpBackend.flush();
    //});
    //
    //it('Should load the before page message page on index -9', function(){
    //
    //  AssumeHttpRequestResponded();
    //  $httpBackend.flush();
    //  urlMessages += "&after=100&before=&range=10";
    //  $httpBackend.expectGET(urlMessages).respond(messages);
    //  var success = function(){};
    //  scope.scrollCalls = 1;
    //  scope.paging = {cursors: {after: 100}};
    //
    //  scope.messagesDatasource.get(-9,10, success);
    //  timeout.flush();
    //  $httpBackend.flush();
    //});
    //
    //
    function AssumeHttpRequestResponded(){
      $httpBackend.expectGET(urlConversation).respond(conversation);
      $httpBackend.expectPUT(urlMarkAsRead, {}).respond({});
      $httpBackend.expectGET(urlMessages+'&after=&before=&range=20').respond(messages);

      //
      //$httpBackend.expectGET(urlConversation).respond(conversation);
      //$httpBackend.expectPUT(urlMarkAsRead, {}).respond({});
      //$httpBackend.expectGET(urlPoller).respond(messages);
      //
      //$httpBackend.expectGET(urlBlockedUsers).respond(blockedUsers);
      //$httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
    }
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn);
