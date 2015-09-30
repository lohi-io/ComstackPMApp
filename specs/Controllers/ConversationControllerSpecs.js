/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module */
(function (describe, it, expect, inject, angular, beforeEach, afterEach) {
  'use strict';

  describe('ConversationCtrl', function () {
    var ctrl, scope, currentUser, messages, conversation, state, stateParams, configurationService;
    var rootScope, $httpBackend;

    beforeEach(angular.mock.module('ComstackPMApp'));
    beforeEach(angular.mock.module('ComstackPMApp.ServicesMock'));


    beforeEach(inject(function (_$rootScope_, $controller, _configurationService_, _$httpBackend_) {
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
      conversation = {
        data: {
          participants: [{
            id: 1,
            name: 'Alice'
          }, {
            id: 2,
            name: 'Bob'
          }]
        }
      };
      configurationService = _configurationService_;

      $httpBackend = _$httpBackend_;
      stateParams = {id: 123};
      scope = _$rootScope_.$new();

      var urlUser = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/users/current-user?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlUser).respond(currentUser);
      var urlConversationMessages = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations/123/messages?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlConversationMessages).respond(messages);
      var urlConversation = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations/123?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlConversation).respond(conversation);
      ctrl = $controller('ConversationCtrl', {
        $scope: scope,
        $state: state,
        $stateParams: stateParams,
        configurationService: configurationService
      });
      $httpBackend.flush();
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    it('Should load in the conversation\'s messages on initialisation', function () {
      expect(angular.equals(scope.messages, messages)).toBeTruthy();
    });

    it('Should load in the current user on initialisation', function () {
      expect(angular.equals(scope.currentUser, currentUser.data)).toBeTruthy();
    });

    it('Should determine the conversation title for a conversation with 2 participants', function() {
      spyOn(configurationService, 'getString');
      conversation = {
        data: {
          participants: [{
            id: 1,
            name: 'Alli'
          }, {
            id: 2,
            name: 'Boycey'
          }]
        }
      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {name: 'Boycey'});
    });

    it('Should determine the conversation title for a conversation with 3 participants', function() {
      spyOn(configurationService, 'getString');
      conversation = {
        data: {
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
        }
      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {name: 'Boycey and Craig'});
    });

    it('Should determine the conversation title for a conversation with 4 participants', function() {
      spyOn(configurationService, 'getString');
      conversation = {
        data: {
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
        }
      };
      scope.computeHeading(conversation);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {name: 'Boycey, Craig and David'});
    });
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);
