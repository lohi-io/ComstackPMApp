/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('MessageCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, availableUsers, Conversation, message, config, currentUser,
      urlAvailableUsers, requiresHttp, createController, accessToken, base_url, urlApi, stateParams, window,
      urlConversations, urlCurrentUser;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));

    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_,$injector) {
      rootScope = _$rootScope_;
      requiresHttp = false;

      Conversation = function () { };
      Conversation.prototype = { "$save": function () { } };

      currentUser = {
        data: {
          user: {
            id: 1,
            name: 'Alice'
          }
        }
      };

      message = {
        recipients: [],
        text: ""
      };

      availableUsers = {
        data: [{
          id: 1,
          name: 'Alice'
        },{
          id: 2,
          name: 'Bob'
        },{
          id: 3,
          name: 'Matt'
        }
        ],
        paging: {
          previous: {},
          next: {},
          range: 10,
          total: 12,
          current_page: 2
        }
      };
      state = {
        "go": function () {
        }
      };

      stateParams = {userId : '1,2,5'};


      $httpBackend = _$httpBackend_;
      config =  $injector.get('configurationService');

      scope = _$rootScope_.$new();
      scope.maxTags = 1;
      spyOn(config, 'getString');
      accessToken = config.getSetting('access_token');
      base_url = config.getSetting('base_url');
      window = {location: {href:""}};


      $httpBackend.when('GET', 'html/home.html').respond({});
      urlApi = config.getSetting('api_url');

      var endPoints = {
        availableUsers: '/cs-pm/users/available-users',
        conversations: '/cs-pm/conversations',
        currentUser: '/cs-pm/users/current-user'
      };
      var queryString = 'access_token=' + accessToken;
      urlAvailableUsers = urlApi + endPoints.availableUsers + '?' + queryString;
      urlConversations = urlApi + endPoints.conversations + '?' + queryString + '&filter%5Bparticipants%5D=1';
      urlCurrentUser = urlApi + endPoints.currentUser + '?' + queryString;

      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      $httpBackend.expectGET(urlCurrentUser).respond(currentUser);
      $httpBackend.expectGET(urlConversations).respond({data: []});

      createController = function() {
        return $controller('MessageCtrl', {
          '$scope': scope,
          '$state': state,
          'config': config,
          '$stateParams': stateParams,
          '$window': window
        });
      };

      ctrl = createController();

      $httpBackend.flush();
    }));

    afterEach(function () {
      if (requiresHttp) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      }

      $httpBackend.resetExpectations();
    });


    it('Should have current user in scope', function () {
      expect(angular.equals(scope.currentUser, currentUser.data)).toBeTruthy();
    });

    it('Should have current message in scope', function () {
      jasmine.createSpy('Conversation.prototype').and.callFake(function () { return message; });
      expect(angular.equals(scope.message, scope.message)).toBeTruthy();
    });

    it('Should have a function to retrieve available users', function () {
      expect(scope.getAvailableUsers).toBeDefined();
      expect(typeof scope.getAvailableUsers).toEqual('function');

      scope.getAvailableUsers('test');
      urlAvailableUsers += '&autocomplete%5Bstring%5D=test';
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      $httpBackend.flush();
    });


    it('Should have a function save the message', function () {
      expect(scope.save).toBeDefined();
      expect(typeof scope.save).toEqual('function');
      var message = jasmine.createSpyObj('message', ['$save', '$update']);
      scope.message = message;
      scope.save();
      expect(message.$save).toHaveBeenCalled();
    });

    it('Should pre-populate to field with the users from params, limited to the max participants setting', function() {
      expect(scope.users.length).toEqual(1);
      expect(scope.users[0].id).toEqual(1);
    });


    it('Should determine if any users are contactable on initialisation', function() {
      expect(scope.isContactsAvailable).toEqual(true);
    });

    it('Should have a cancel button', function(){
      expect(scope.cancel).toBeDefined();
      expect(typeof scope.cancel).toEqual('function');
    });

    it('Should redirect to the conversation if user and contact already have a conversation', function() {
      var conversationsWithContact = {
        data: [{
          id: 149
        }]
      };
      var contact = {
        id: 1
      };
      urlConversations = urlApi + '/cs-pm/conversations?access_token=' + accessToken
        + '&filter%5Bparticipants%5D=' + contact.id;
      spyOn(state, 'go');
      $httpBackend.expectGET(urlConversations).respond(conversationsWithContact);

      scope.prepareMessageForContact(contact);

      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('conversation', {id: conversationsWithContact.data[0].id});
    });

    it('Should pre-populate the "To" field with the contact if there is no existing conversation', function() {
      var contact = {
        id: 1
      };

      urlConversations = urlApi + '/cs-pm/conversations?access_token=' + accessToken
        + '&filter%5Bparticipants%5D=' + contact.id;
      spyOn(state, 'go');
      $httpBackend.expectGET(urlConversations).respond({
        data: []
      });

      scope.prepareMessageForContact(contact);

      $httpBackend.flush();
      expect(scope.users).toContain(contact);
    });

    it('Should redirect to the friends page when coming from there and cancel', function(){
      scope.requiredUsers = '1111';
      scope.cancel();
      expect(window.location.href).toEqual(base_url+'/friends/'+scope.currentUser.user.id);
    });

    it('Should redirect to the inbox when coming from there and cancel', function(){
      scope.requiredUsers = '';
      spyOn(state, 'go');
      scope.cancel();
      expect(state.go).toHaveBeenCalledWith('inbox', {page: 1}, { reload: 'conversation', inherit: false, notify: true });
    });


    it('Should get the strings from configuration', function(){
      var maxLength = config.getSetting('text__maxlength');
      expect(config.getString.calls.count()).toBe(13);
      expect(config.getString).toHaveBeenCalledWith('form__to__label');
      expect(config.getString).toHaveBeenCalledWith('form__to__placeholder__singular');
      expect(config.getString).toHaveBeenCalledWith('form__to__validation__empty');
      expect(config.getString).toHaveBeenCalledWith('form__to__validation__limit_exceeded', {number_label: '1 person'});
      expect(config.getString).toHaveBeenCalledWith('form__text__placeholder');
      expect(config.getString).toHaveBeenCalledWith('form__text__validation__empty');
      expect(config.getString).toHaveBeenCalledWith('form__text__validation__maxlength', {number: maxLength});
      expect(config.getString).toHaveBeenCalledWith('form__text__warning__emoji');
      expect(config.getString).toHaveBeenCalledWith('form__new_conversation__submit');
      expect(config.getString).toHaveBeenCalledWith('form__new_conversation__header', {base_url: base_url, user_id: 1});
      expect(config.getString).toHaveBeenCalledWith('button__cancel');
      expect(config.getString).toHaveBeenCalledWith('link__no_available_users');
      expect(config.getString).toHaveBeenCalledWith('text__no_conversations_no_friends');
    });


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



