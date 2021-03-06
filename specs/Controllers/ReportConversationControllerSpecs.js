/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('ReportConversationCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, Conversation, message, config, conversation, stateParams,
      modalInstance, urlApi, queryString, getEnpPoint, deleteEndPoint, endPoint, accessToken, Alert;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, $injector) {
      rootScope = _$rootScope_;

      conversation = {
        "data": [{
          "type": "message",
          "id": 1,
          "conversation_id": 1,
          "sender": {
            "type": "user",
            "id": 70116,
            "name": "basic_user_1",
          },
          "sent": "2015-10-02T16:15:00+01:00",
          "updated": "2015-10-02T16:15:00+01:00",
          "text": "message 1",
          "deleted": false
        },
          {
            "type": "message",
            "id": 2,
            "conversation_id": 1,
            "sender": {
              "type": "user",
              "id": 70116,
              "name": "basic_user_1",
            },
            "sent": "2015-10-02T16:15:00+01:00",
            "updated": "2015-10-02T16:15:00+01:00",
            "text": "message 2",
            "deleted": false
          }]
      };

      Alert = {
        notify: function(type, affected) {
          // stub method
        }
      };

      state = {
        "go": function () {
        }
      };
      $httpBackend = _$httpBackend_;
      config = $injector.get('configurationService');
      stateParams = {id: 1};

      urlApi = config.getSetting('api_url');
      accessToken = config.getSetting('access_token');
      queryString = 'access_token='+accessToken;
      endPoint = '/cs-pm-report';
      $httpBackend.when('GET', 'html/home.html').respond({});
      $httpBackend.flush();

      modalInstance = {
        // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

      scope = _$rootScope_.$new();
      spyOn(config, 'getString');
      ctrl = $controller('ReportConversationCtrl', {
        '$scope': scope,
        '$state': state,
        'config': config,
        '$stateParams': stateParams,
        '$modalInstance': modalInstance,
        'Alert': Alert
       // 'Conversation': Conversation.prototype
      });

    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    function AssumeConfirmIsCalled() {
      spyOn(config, 'getSetting').and.returnValue('qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc');
      scope.confirm();
      var url = urlApi + endPoint + '?' + queryString;
      $httpBackend.expectPOST(url).respond(conversation);
      $httpBackend.flush();
    }

    it('Should have a confirm function', function () {
      expect(scope.confirm).toBeDefined();
      expect(typeof scope.confirm).toEqual('function');
    });

    it('Should use service to get the conversation to delete', function () {
      AssumeConfirmIsCalled();
    });


    it('Should close the modal using modal instance', function () {

      AssumeConfirmIsCalled();
      expect(modalInstance.close).toHaveBeenCalled();

    });

    //it('Should call report on resource', function () {
    //
    //  spyOn(Conversation.prototype, 'report');
    //  AssumeConfirmIsCalled();
    //  expect(Conversation.report()).toHaveBeenCalled();
    //
    //});


    it('Should have a cancel function', function () {
      expect(scope.cancel).toBeDefined();
      expect(typeof scope.cancel).toEqual('function');
    });

    it('Should cancel using dismiss', function () {
      scope.cancel();
      expect(modalInstance.dismiss).toHaveBeenCalled();
    });

    it('Should get the strings from configuration', function(){
      expect(config.getString.calls.count()).toBe(1);
      expect(config.getString).toHaveBeenCalledWith('modal__report__heading');
    });


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



