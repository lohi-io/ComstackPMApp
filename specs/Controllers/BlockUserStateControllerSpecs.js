/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('BlockUserCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, Conversation, config, stateParams, modalInstance, urlApi, queryString, getEnpPoint, blockEndpoint, conversation, currentUser, contact, accessToken, requiresHttp;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, $injector) {
      rootScope = _$rootScope_;

      //Conversation = function () {
      //};
      //Conversation.prototype = {
      //  "$delete": function () {
      //  }
      //};

      currentUser = {
        data: {
          user: {
            id: 1,
            name: 'Alice'
          },
          permissions: {
            users: {
              friend: true,
              block: true
            }
          }
        },

      };

      contact = {
        data: {
          user: {
            id: 2,
            name: 'Bob'
          }
        }
      };

      conversation = {
        data: {
          id: 1,
          participants: [
            currentUser.data.user,
            contact.data.user
          ]
        }
      };


      state = {
        "go": function () {
        }
      };
      $httpBackend = _$httpBackend_;
      requiresHttp = true;
      config = $injector.get('configurationService');

      stateParams = {id: 1};
      accessToken = 'qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc'
      urlApi = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1';
      queryString = 'access_token='+accessToken;

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
      spyOn(config, 'getSetting').and.returnValue(accessToken);

      var urlUser = urlApi+'/cs-pm/users/current-user?'+queryString;
      $httpBackend.expectGET(urlUser).respond(currentUser);
      var urlConversation = urlApi+'/cs-pm/conversations/1?'+queryString;
      $httpBackend.expectGET(urlConversation).respond(conversation);


      ctrl = $controller('BlockUserCtrl', {
        '$scope': scope,
        '$state': state,
        'config': config,
        '$stateParams': stateParams,
        '$modalInstance': modalInstance
      });

    }));

    afterEach(function () {
      if(requiresHttp){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
      }
    });

    function AssumeConfirmIsCalled() {
      requiresHttp = false;
      var url = urlApi + '/cs-fr/blocked' + '?' + queryString;
      $httpBackend.expectPOST(url).respond({});
      scope.confirm();
      $httpBackend.flush();
    }

    it('Should have current user in scope', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(angular.equals(scope.currentUser, currentUser.data)).toBeTruthy();
    });

    //it('', function(){
    //
    //})

    it('Should have a confirm function', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(scope.confirm).toBeDefined();
      expect(typeof scope.confirm).toEqual('function');
    });

    it('Should have the users to be blocked', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(scope.users.length).toEqual(1);


    });

    //it('Should use service block the user', function () {
    //  AssumeConfirmIsCalled();
    //});
    //
    //
    //it('Should close the modal using modal instance', function () {
    //
    //  AssumeConfirmIsCalled();
    //  expect(modalInstance.close).toHaveBeenCalled();
    //
    //});
    //
    //it('Should have a cancel function', function () {
    //  expect(scope.cancel).toBeDefined();
    //  expect(typeof scope.cancel).toEqual('function');
    //});
    //
    //it('Should cancel using dismiss', function () {
    //  scope.cancel();
    //  expect(modalInstance.dismiss).toHaveBeenCalled();
    //});
    //
    //it('Should get the strings from configuration', function(){
    //  expect(config.getString.calls.count()).toBe(2);
    //  expect(config.getString).toHaveBeenCalledWith('modal__delete_conversation__heading');
    //  expect(config.getString).toHaveBeenCalledWith('modal__delete_conversation__text');
    //});


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



