/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn) {

  describe('InboxCtrl', function () {
    var ctrl, scope, currentUser, conversations, state, stateParams, fakeUserService;
    var userService, rootScope, $httpBackend, configurationService;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, _configurationService_) {
      rootScope = _$rootScope_;
      currentUser = {
        data: {
          user: {
            id: 1,
            name: 'Alice'
          }
        }
      };
      messages = {
        data: ['My conversation messages']
      };

      conversations = {
        data: [],
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
      configurationService = _configurationService_;
      $httpBackend = _$httpBackend_;
      stateParams = {page: 1};
      scope = _$rootScope_.$new();
      userService = fakeUserService;

      var urlUser = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/users/current-user?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlUser).respond(currentUser);
      var urlConversation = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc&page=1';
      $httpBackend.expectGET(urlConversation).respond(conversations);


      ctrl = $controller('InboxCtrl', {
        '$scope': scope,
        '$state': state,
        '$stateParams': stateParams,
        'config': configurationService
      });
      $httpBackend.flush();
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    it('Should have current user in scope', function () {
      expect(angular.equals(scope.currentUser, currentUser.data)).toBeTruthy();
    });
    it('Should have conversations in scope', function () {
      expect(angular.equals(scope.conversations, conversations.data)).toBeTruthy();
    });

    it('Should have a goToPage() function', function () {
      expect(scope.goToPage).toBeDefined();
      expect(typeof scope.goToPage).toEqual("function");
    });

    it('Should have change the state when calling goToPage() function', function () {
      spyOn(state, 'go');
      scope.goToPage(2);
      expect(state.go).toHaveBeenCalledWith('inbox', {page: 2});
    });

    it('Should have a previous() function', function () {
      expect(scope.previous).toBeDefined();
      expect(typeof scope.previous).toEqual("function");
    });

    it('should change state if previous exists when calling previous() function ', function () {
      scope.conversations = {"data":[], "previous":{} };
      scope.currentPage = 2;
      spyOn(state, 'go');
      scope.previous();
      expect(state.go).toHaveBeenCalledWith('inbox', {page: 1});
    });

    it('should not change state if previous does not exists when calling previous() function ', function () {

      scope.paging =   {
        next: {},
        range: 10,
          total: 12,
          current_page: 2
      };
      scope.currentPage = 1;
      spyOn(state, 'go');
      scope.previous();
      expect(state.go.calls.count()).toEqual(0);
    });

    it('Should have a next() function', function () {
      expect(scope.next).toBeDefined();
      expect(typeof scope.next).toEqual("function");
    });

    it('should change state if next exists when calling next() function ', function () {
      scope.conversations = {"data":[], "next":{} };
      scope.currentPage = 2;
      spyOn(state, 'go');
      scope.next();
      expect(state.go).toHaveBeenCalledWith('inbox', {page: 3});
    });

    it('should not change state if next does not exists when calling next() function ', function () {
      scope.paging =   {
        range: 10,
        total: 12,
        current_page: 2
      };
      scope.currentPage = 1;
      spyOn(state, 'go');
      scope.next();
      expect(state.go.calls.count()).toEqual(0);
    });

    it('Should determine the conversation title for a conversation with 2 participants', function() {
      spyOn(configurationService, 'getString');
      var conversation = {
          participants: [{
            id: 1,
            name: 'Alli'
          }, {
            id: 2,
            name: 'Boycey'
          }]
      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {participants: 'Boycey'});
    });

    it('Should determine the conversation title for a conversation with 3 participants', function() {
      spyOn(configurationService, 'getString');
      var conversation = {

          participants: [{
            id: 1,
            name: 'Alli'
          }, {
            id: 2,
            name: 'Boycey'
          }, {
            id: 3,
            name: 'Craig'
          }]

      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {participants: 'Boycey and Craig'});
    });

    it('Should determine the conversation title for a conversation with 4 participants', function() {
      spyOn(configurationService, 'getString');
      var conversation = {
          participants: [{
            id: 1,
            name: 'Alli'
          }, {
            id: 2,
            name: 'Boycey'
          }, {
            id: 3,
            name: 'Craig'
          }, {
            id: 4,
            name: 'David'
          }]
      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {participants: 'Boycey, Craig and David'});
    });

    it('Should determine the conversation from historical participants when participants is empty', function() {
      spyOn(configurationService, 'getString');
      var conversation = {
        participants: [],
        historical_participants: [{
          id: 1,
          name: 'Alli'
        }, {
          id: 2,
          name: 'Boycey'
        }, {
          id: 3,
          name: 'Craig'
        }, {
          id: 4,
          name: 'David'
        }]
      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {participants: 'Boycey, Craig and David'});
    });

    it('Should have a delete function that goes to delete state', function(){
      var conversation = {id: 1};
      expect(scope.delete).toBeDefined();
      expect(typeof scope.delete).toBe('function');
      spyOn(state, 'go');
      scope.delete(conversation);
      expect(state.go).toHaveBeenCalledWith('inbox.delete', {page: 1, id: 1});
    });

  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



