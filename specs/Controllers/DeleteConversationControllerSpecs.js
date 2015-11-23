/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('DeleteConversationCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, availableUsers, Conversation, message, config, convesation, stateParams, modalInstance, urlApi, queryString, getEnpPoint, deleteEndPoint, accessToken, getAllEndpoint, conversations;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, $injector) {
      rootScope = _$rootScope_;

      Conversation = function () {
      };
      Conversation.prototype = {
        "$delete": function () {
        }
      };

      conversations = {data:[{id: 1},{id: 2}]};

      convesation = {
        "data": {
          "type": "conversation",
          "id": 1
        }
      };

      state = {
        "go": function () {
        }
      };
      $httpBackend = _$httpBackend_;
      config = $injector.get('configurationService');
      stateParams = {id: 1, page:2};

      accessToken = config.getSetting('access_token');
      urlApi = config.getSetting('api_url');

      queryString = 'access_token='+accessToken;
      getEnpPoint = '/cs-pm/conversations/1';
      getAllEndpoint = '/cs-pm/conversations';
      deleteEndPoint = '/cs-pm/conversations/1';


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
      ctrl = $controller('DeleteConversationCtrl', {
        '$scope': scope,
        '$state': state,
        'config': config,
        '$stateParams': stateParams,
        '$modalInstance': modalInstance
      });

    }));

    afterEach(function () {
      //$httpBackend.verifyNoOutstandingExpectation();
      //$httpBackend.verifyNoOutstandingRequest();
      //$httpBackend.resetExpectations();
    });

    function AssumeConfirmIsCalled() {
      //spyOn(config, 'getSetting').and.returnValue('qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc');

      $httpBackend.when('GET', 'html/home.html').respond({});
      var url = urlApi + getEnpPoint + '?' + queryString;
      $httpBackend.expectGET(url).respond(convesation);

      url = urlApi + deleteEndPoint + '?' + queryString;
      $httpBackend.expectDELETE(url).respond({});

      url = urlApi + getAllEndpoint + '?' + queryString+'&page=2';
      $httpBackend.expectGET(url).respond(conversations);

      scope.confirm();
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

    it('Should have a cancel function', function () {
      expect(scope.cancel).toBeDefined();
      expect(typeof scope.cancel).toEqual('function');
    });

    it('Should cancel using dismiss', function () {
      scope.cancel();
      expect(modalInstance.dismiss).toHaveBeenCalled();
    });

    it('Should get the strings from configuration', function(){
      expect(config.getString.calls.count()).toBe(2);
      expect(config.getString).toHaveBeenCalledWith('modal__delete_conversation__heading');
      expect(config.getString).toHaveBeenCalledWith('modal__delete_conversation__text');
    });

    it('Should disable the OK button on confirm', function(){
      scope.OkClicked = false;
      AssumeConfirmIsCalled();
      expect(scope.OkClicked).toBeTruthy();
    });


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



