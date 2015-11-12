/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach,module) {
  describe('ConversationService', function() {
    var mockBackend, Conversation, config;

    beforeEach(angular.mock.module("ComstackPMApp.Services"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));

    beforeEach(inject(function($injector){
      mockBackend = $injector.get('$httpBackend');
      Conversation = $injector.get('Conversation');
      config =  $injector.get('configurationService');

    }));

    it('Should load conversation for current user using ConfigurationService', function() {
      var response = {
        'data': {
          'user': {
            'type': 'user',
            'id': 66531,
            'name': 'basic_user_1'
          }
        }
      };
      var result;

      var url = config.appSettings.api_url+'/cs-pm/conversations?access_token='+config.appSettings.access_token+'&page=1';
      mockBackend.expectGET(url).respond(response);
      var promise = Conversation.get({page: 1}).$promise;

      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    it('Should load a conversation by ID', function() {
      var response = {
        'data': {
          'user': {
            'type': 'user',
            'id': 66531,
            'name': 'basic_user_1'
          }
        }
      };
      var result;

      var url = config.appSettings.api_url + '/cs-pm/conversations/123?access_token=' + config.appSettings.access_token;
      mockBackend.expectGET(url).respond(response);
      var promise = Conversation.get({id: 123}).$promise;

      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    it('Should be able to create replies to existing conversations', function() {
      var message = {
        text: 'It works'
      };

      var newMessage = {
        id: 1,
        conversation_id: 123,
        text: message.text
      };
      var result;
      var url = config.appSettings.api_url + '/cs-pm/conversations/' + newMessage.conversation_id +
        '/reply?access_token=' + config.appSettings.access_token;

      mockBackend.expectPOST(url, message).respond(newMessage);
      var promise = Conversation.reply({id: newMessage.conversation_id}, message).$promise;

      promise.then(function(response) {
        result = response;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, newMessage)).toBeTruthy();
    });

    it('Should save a new conversation', function() {
      var response = {
        'data': {
          'user': {
            'type': 'user',
            'id': 66531,
            'name': 'basic_user_1'
          }
        }
      };
      var result;

      var url = config.appSettings.api_url + '/cs-pm/conversations?access_token=' + config.appSettings.access_token;
      mockBackend.expectPOST(url).respond(response);
      var promise = Conversation.save({id: 123}).$promise;

      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    it('Should delete a conversation', function() {
      var response = {
        'data': {
          'user': {
            'type': 'user',
            'id': 66531,
            'name': 'basic_user_1'
          }
        }
      };
      var result;

      var url = config.appSettings.api_url + '/cs-pm/conversations/123?access_token=' + config.appSettings.access_token;
      mockBackend.expectDELETE(url).respond(response);
      var promise = Conversation.delete({id: 123}).$promise;

      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    it('Should report a conversation', function() {
      var response = {
        'data': {
          'user': {
            'type': 'user',
            'id': 66531,
            'name': 'basic_user_1'
          }
        }
      };
      var result;

      var url = config.appSettings.api_url + '/cs-pm-report?access_token=' + config.appSettings.access_token;
      mockBackend.expectPOST(url).respond(response);
      var promise = Conversation.report().$promise;

      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    describe('Conversation representation', function() {
      it('Should get an array of participants based on who the current user is', function() {
        var currentUser = {
          user: {
            id: 1,
            name: 'Alice'
          }
        };
        var contact = {
          user: {
            id: 2,
            name: 'Bob'
          }
        };
        var conversation = {
          participants: [currentUser.user, contact.user]
        };

        expect(Conversation.getOtherParticipants(conversation, currentUser)).toEqual([contact.user]);
      });

      it('Should get an array of participants based on who the current user is, when other users have left the conversation', function() {
        var currentUser = {
          user: {
            id: 1,
            name: 'Alice'
          }
        };
        var contact = {
          user: {
            id: 2,
            name: 'Bob'
          }
        };
        var conversation = {
          participants: [currentUser.user],
          historical_participants: [currentUser.user, contact.user]
        };

        expect(Conversation.getOtherParticipants(conversation, currentUser)).toEqual([contact.user]);
      });

      it('Should list other participants in a human readable fashion', function() {
        var currentUser = {
          user: {
            id: 1,
            name: 'Alice'
          }
        };
        var contact = {
          user: {
            id: 2,
            name: 'Bob'
          }
        };
        var conversation = {
          participants: [currentUser.user, contact.user]
        };

        expect(Conversation.getReadableOtherParticipants(conversation, currentUser)).toEqual(contact.user.name);
      });
    });
  });
})(describe, it, expect, inject, angular, beforeEach, angular.mock.module);
