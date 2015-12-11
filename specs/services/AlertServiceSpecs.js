(function (describe, it, expect, inject, angular, beforeEach) {
  describe('AlertService', function () {
    var Alert, $httpBackend, config, apiUrl, accessToken, currentUserUrl;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.Services"));

    beforeEach(inject(function ($injector, _configurationService_) {
      $httpBackend = $injector.get('$httpBackend');
      Alert = $injector.get('Alert');
      config = _configurationService_;

      apiUrl = config.getSetting('api_url');
      accessToken = config.getSetting('access_token');

      currentUserUrl = apiUrl + '/cs-pm/users/current-user?access_token=' + accessToken;

      $httpBackend.when('GET', 'html/home.html').respond({});
      $httpBackend.flush();
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    it('Should have a notify function', function () {
      expect(Alert.notify).toBeDefined();
      expect(typeof Alert.notify).toEqual('function');
    });

    it('Should create a suitable confirmation message when a conversation is reported', function () {
      // Set up users and conversation between them.
      var currentUser = {
        id: 1,
        name: 'Alice'
      };

      var contact = {
        id: 2,
        name: 'Bob'
      };

      var conversation = {
        data: {
          id: 1,
          participants: [
            currentUser.data,
            contact
          ]
        }
      };

      // Handle expected HTTP requests.
      $httpBackend.expectGET(currentUserUrl).respond({
        data: {
          user: currentUser
        }
      });
      $httpBackend.expectGET(apiUrl + '/cs-pm/conversations/' + conversation.data.id + '?access_token=' + accessToken)
        .respond(conversation);

      spyOn(config, 'getString').and.callThrough();
      Alert.notify('reported', conversation.data.id);

      $httpBackend.flush();
      expect(Alert.message).toEqual(config.getString('text__report_success', {participants: contact.name}));
    });

    it('Should create a suitable confirmation message when a user is blocked.', function() {
      var blockedContactName = 'Bob';

      Alert.notify('blocked', blockedContactName);
      expect(Alert.message).toEqual(config.getString('text__block_success', {participant: blockedContactName}));
    });
  });
})(describe, it, expect, inject, angular, beforeEach);
