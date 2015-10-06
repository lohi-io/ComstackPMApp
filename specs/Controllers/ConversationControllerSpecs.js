(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn) {
  'use strict';

  describe('ConversationCtrl', function () {
    var scope, currentUser, messages, conversation, state, stateParams, configurationService;
    var urlUser, urlConversation, urlConversationMessages, urlAvailableUsers, urlBlockedUsers;
    var $httpBackend, requiresHttp;

    var contact, availableUsers;

    beforeEach(angular.mock.module('ComstackPMApp'));
    beforeEach(angular.mock.module('ComstackPMApp.ServicesMock'));

    beforeEach(inject(function (_$rootScope_, $controller, _configurationService_, _$httpBackend_) {
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
      requiresHttp = true;
      stateParams = {id: conversation.data.id};
      scope = _$rootScope_.$new();

      state = {
        go: function() {
          // stub method
        }
      };

      /* eslint-disable max-len */
      urlUser = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/users/current-user?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlUser).respond({
        data: currentUser
      });
      urlConversationMessages = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations/123/messages?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlConversationMessages).respond(messages);
      urlConversation = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations/123?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlConversation).respond(conversation);
      urlAvailableUsers  = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/users/available-users?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc&filter%5Bid%5D=2';
      urlBlockedUsers = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-fr/blocked?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc&filter%5Buser%5D=2';
      /* eslint-enable max-len */
      $controller('ConversationCtrl', {
        $scope: scope,
        $state: state,
        $stateParams: stateParams,
        configurationService: configurationService
      });
    }));

    afterEach(function () {
      if (requiresHttp) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
      }
    });

    it('Should be able to navigate to the inbox', function() {
      requiresHttp = false;

      expect(scope.goToInbox).not.toBeUndefined();
      expect(typeof scope.goToInbox).toEqual('function');
      spyOn(state, 'go');
      scope.goToInbox();
      expect(state.go).toHaveBeenCalledWith('inbox', {page: 1}, {reload: 'inbox'});
    });

    it('Should load in the conversation\'s messages on initialisation', function () {
      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      // Let the initial XHRs finish.
      $httpBackend.flush();

      expect(angular.equals(scope.messages, messages)).toBeTruthy();
    });

    it('Should load in the current user on initialisation', function () {
      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      // Let the initial XHRs finish.
      $httpBackend.flush();
      expect(angular.equals(scope.currentUser, currentUser)).toBeTruthy();
    });

    it('Should determine the conversation title for a conversation with 2 participants', function() {
      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      // Let the initial XHRs finish.
      $httpBackend.flush();
      spyOn(configurationService, 'getString');
      conversation = {
        data: {
          participants: [
            currentUser.user,
            contact.user
          ]
        }
      };
      scope.computeHeading(conversation.data);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {
        participants: contact.user.name
      });
    });

    it('Should determine the conversation title for a conversation with 3 participants', function() {
      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      // Let the initial XHRs finish.
      $httpBackend.flush();
      spyOn(configurationService, 'getString');
      conversation = {
        data: {
          participants: [
            currentUser.user,
            contact.user, {
              id: 3,
              name: 'Craig'
            }
          ]
        }
      };
      scope.computeHeading(conversation.data);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {
        participants: contact.user.name + ' and ' + conversation.data.participants[2].name
      });
    });

    it('Should determine the conversation title for a conversation with 4 participants', function() {
      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      // Let the initial XHRs finish.
      $httpBackend.flush();
      spyOn(configurationService, 'getString');
      conversation = {
        data: {
          participants: [
            currentUser.user,
            contact.user, {
              id: 3,
              name: 'Craig'
            }, {
              id: 4,
              name: 'David'
            }
          ]
        }
      };
      scope.computeHeading(conversation.data);
      expect(configurationService.getString).toHaveBeenCalledWith('heading__conversation_with', {
        participants: contact.user.name + ', ' + conversation.data.participants[2].name + ' and ' +
          conversation.data.participants[3].name
      });
    });

    it('Should detect when the contact is available, assuming they are not blocked', function() {
      scope.computeAvailability(conversation);

      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      // Expect controller defaults which assume user is not available for contact.
      expect(scope.isContactAvailable).toEqual(false);
      expect(scope.isContactBlocked).toEqual(false);

      $httpBackend.flush();
      expect(scope.isContactAvailable).toEqual(true);
      expect(scope.isContactBlocked).toEqual(false);
    });

    it('Should detect when the contact is unavailable, assuming they are not blocked', function() {
      var unavailableContact = {
        id: 2,
        name: 'Unavailable'
      };
      var noAvailableUsers = {
        data: []
      };
      var conversationWithUnavailableContact = {
        data: {
          id: 1,
          participants: [
            currentUser.data,
            unavailableContact
          ]
        }
      };

      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(noAvailableUsers);

      scope.computeAvailability(conversationWithUnavailableContact);

      // Expect controller defaults which assume user is not available for contact.
      expect(scope.isContactAvailable).toEqual(false);
      expect(scope.isContactBlocked).toEqual(false);

      $httpBackend.flush();
      expect(scope.isContactAvailable).toEqual(false);
      expect(scope.isContactBlocked).toEqual(false);
    });

    it('Should detect when the current user has blocked the contact', function() {
      var blockedUser = {
        id: 2,
        name: 'Blocked'
      };
      var blockedRelationship = {
        data: [
          {
            type: 'relationship',
            id: 1,
            relationship_type: 'comstack_blocked',
            user: blockedUser
          }
        ]
      };
      var conversationWithBlockedUser = {
        id: 1,
        participants: [
          currentUser.data,
          blockedUser
        ]
      };
      $httpBackend.expectGET(urlBlockedUsers).respond(blockedRelationship);

      scope.computeAvailability(conversationWithBlockedUser);

      // Expect controller defaults which assume user is not available for contact.
      expect(scope.isContactAvailable).toEqual(false);
      expect(scope.isContactBlocked).toEqual(false);

      $httpBackend.flush();
      expect(scope.isContactAvailable).toEqual(false);
      expect(scope.isContactBlocked).toEqual(true);
    });

    it('Should be able to create a reply to the current conversation, appending it to the messages list', function() {
      // Skip the initial AJAX requests.
      $httpBackend.expectGET(urlBlockedUsers).respond({});
      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);
      $httpBackend.flush();

      scope.reply.text = 'It works';
      var urlReplyToConversation = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations/' +
        conversation.data.id + '/reply?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      var newMessage = {
        data: [{
          id: 1,
          conversation_id: conversation.data.id,
          text: scope.reply.text
        }]
      };

      $httpBackend.expectPOST(urlReplyToConversation, scope.reply).respond(newMessage);
      scope.submitReply();
      $httpBackend.flush();

      var lastMessage = scope.messages.data[scope.messages.data.length - 1];
      expect(angular.equals(lastMessage, newMessage.data[0])).toBeTruthy();

      expect(scope.reply.text).toEqual('');
    });
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn);
