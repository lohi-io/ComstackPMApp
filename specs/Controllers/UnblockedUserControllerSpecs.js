/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('UnblockUserCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, config, stateParams, modalInstance, urlApi, queryString, conversation, currentUser, contact, accessToken, requiresHttp, blockedUsers;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, $injector) {
      rootScope = _$rootScope_;

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

      blockedUsers = {
        data: [
          {
            id: 1,
            user: {
              id: 2,
              name: 'Bob'
            }
          }
        ]
      };


      state = {
        "go": function () {
        }
      };
      $httpBackend = _$httpBackend_;
      requiresHttp = true;
      config = $injector.get('configurationService');

      stateParams = {id: 1};
      urlApi = config.getSetting('api_url');
      accessToken = config.getSetting('access_token');
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
      $httpBackend.when('GET', 'html/home.html').respond({});
      var urlUser = urlApi+'/cs-pm/users/current-user?'+queryString;
      $httpBackend.expectGET(urlUser).respond(currentUser);
      var urlConversation = urlApi+'/cs-pm/conversations/1?'+queryString;
      $httpBackend.expectGET(urlConversation).respond(conversation);
      var urlBlockedUsers =  urlApi+'/cs-fr/blocked?'+queryString+'&filter%5Buser%5D='+contact.data.user.id;
      $httpBackend.expectGET(urlBlockedUsers).respond(blockedUsers);


      ctrl = $controller('UnblockUserCtrl', {
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
      var url = urlApi + '/cs-fr/blocked/1' + '?' + queryString;
      $httpBackend.expectDELETE(url).respond({});
      scope.confirm();
      $httpBackend.flush();
    }

    it('Should have current user in scope', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(angular.equals(scope.currentUser, currentUser.data)).toBeTruthy();
    });

    it('Should have the list of users that can be blocked in scope', function(){
      requiresHttp = true;
      $httpBackend.flush();
      expect(scope.blockedUsers.length).toEqual(1);
      expect(scope.blockedUsers).toEqual([{id: 2, name: 'Bob', isSelected: true}]);
    });

    it('Should have a confirm function', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(scope.confirm).toBeDefined();
      expect(typeof scope.confirm).toEqual('function');
    });

    it('Should have the users to be unblocked', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(scope.blockedUsers.length).toEqual(1);
    });

    it('Should use service unblock the user', function () {
      requiresHttp = true;
      $httpBackend.flush();
      AssumeConfirmIsCalled();
    });


    it('Should close the modal using modal instance', function () {
      requiresHttp = true;
      $httpBackend.flush();
      AssumeConfirmIsCalled();
      expect(modalInstance.close).toHaveBeenCalled();

    });

    it('Should have a cancel function', function () {
      requiresHttp = true;
      $httpBackend.flush();
      expect(scope.cancel).toBeDefined();
      expect(typeof scope.cancel).toEqual('function');
    });

    it('Should cancel using dismiss', function () {
      requiresHttp = true;
      $httpBackend.flush();
      scope.cancel();
      expect(modalInstance.dismiss).toHaveBeenCalled();
    });

    it('Should get the strings from configuration', function(){
      requiresHttp = true;
      $httpBackend.flush();
      expect(config.getString.calls.count()).toBe(4);
      expect(config.getString).toHaveBeenCalledWith('modal__unblock__heading');
      expect(config.getString).toHaveBeenCalledWith('button__ok');
      expect(config.getString).toHaveBeenCalledWith('button__cancel');
      expect(config.getString).toHaveBeenCalledWith('modal__unblock__text',{ name: 'Bob' });
    });


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



