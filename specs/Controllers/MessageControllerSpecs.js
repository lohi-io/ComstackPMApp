/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('MessageCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, availableUsers, Conversation, message;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_) {
      rootScope = _$rootScope_;

      Conversation = function () { };
      Conversation.prototype = { "$save": function () { } };

      message = {
        recipients: [],
        text: ""
      }
      availableUsers = {
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
      $httpBackend = _$httpBackend_;

      scope = _$rootScope_.$new();

      ctrl = $controller('MessageCtrl', {
        '$scope': scope,
        '$state': state
      });

    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    it('Should have current message in scope', function () {
      jasmine.createSpy('Conversation.prototype').and.callFake(function () { return message; });
      expect(angular.equals(scope.message, scope.message)).toBeTruthy();
    });

    it('Should have a function to retrieve available users', function () {
      expect(scope.getAvailableUsers).toBeDefined();
      expect(typeof scope.getAvailableUsers).toEqual('function');

      scope.getAvailableUsers('test');
      var urlApi = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1';
      var enpPoint = '/cs-pm/users/available-users';
      var queryString = 'access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc&autocomplete%5Bstring%5D=test';
      var urlAvailableUsers = urlApi+enpPoint+'?'+queryString;
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

    //it('Should change the state on save success', function()
    //{
    //  spyOn(state, 'go');
    //  scope.save();
    //  expect(state.go).toHaveBeenCalledWith('conversation', {}, {
    //    reload: 'conversation',
    //    inherit: false,
    //    notify: true
    //  });
    //});


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



