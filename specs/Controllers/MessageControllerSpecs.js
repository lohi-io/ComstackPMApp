/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('MessageCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, availableUsers, Conversation, message, config, currentUser,
      urlAvailableUsers, requiresHttp;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));

    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_,$injector) {
      rootScope = _$rootScope_;
      requiresHttp = false;

      Conversation = function () { };
      Conversation.prototype = { "$save": function () { } };

      currentUser = {
        data: {
          user: {
            id: 1,
            name: 'Alice'
          }
        }
      };

      message = {
        recipients: [],
        text: ""
      };

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
      config =  $injector.get('configurationService');

      scope = _$rootScope_.$new();
      spyOn(config, 'getString');



      var urlApi = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1';
      var endPoint = '/cs-pm/users/available-users';
      var queryString = 'access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      urlAvailableUsers = urlApi + endPoint + '?' + queryString;

      $httpBackend.expectGET(urlAvailableUsers).respond(availableUsers);

      var urlUser = 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/users/current-user?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';
      $httpBackend.expectGET(urlUser).respond(currentUser);

      ctrl = $controller('MessageCtrl', {
        '$scope': scope,
        '$state': state,
        'config': config
      });
      $httpBackend.flush();
    }));

    afterEach(function () {
      if (requiresHttp) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      }

      $httpBackend.resetExpectations();
    });


    it('Should have current user in scope', function () {
      expect(angular.equals(scope.currentUser, currentUser.data)).toBeTruthy();
    });

    it('Should have current message in scope', function () {
      jasmine.createSpy('Conversation.prototype').and.callFake(function () { return message; });
      expect(angular.equals(scope.message, scope.message)).toBeTruthy();
    });

    it('Should have a function to retrieve available users', function () {
      expect(scope.getAvailableUsers).toBeDefined();
      expect(typeof scope.getAvailableUsers).toEqual('function');

      scope.getAvailableUsers('test');
      urlAvailableUsers += '&autocomplete%5Bstring%5D=test';
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


    it('Should get the strings from configuration', function(){
      expect(config.getString.calls.count()).toBe(13);
      expect(config.getString).toHaveBeenCalledWith('form__to__label');
      expect(config.getString).toHaveBeenCalledWith('form__to__placeholder__singular');
      expect(config.getString).toHaveBeenCalledWith('form__to__validation__empty');
      expect(config.getString).toHaveBeenCalledWith('form__to__validation__limit_exceeded', {number_label: '1 person'});
      expect(config.getString).toHaveBeenCalledWith('form__text__placeholder');
      expect(config.getString).toHaveBeenCalledWith('form__text__validation__empty');
      expect(config.getString).toHaveBeenCalledWith('form__text__validation__maxlength', {number: 10});
      expect(config.getString).toHaveBeenCalledWith('form__text__warning__emoji');
      expect(config.getString).toHaveBeenCalledWith('form__new_conversation__submit');
      expect(config.getString).toHaveBeenCalledWith('form__new_conversation__header', {user_id: 1});
      expect(config.getString).toHaveBeenCalledWith('button__cancel');
      expect(config.getString).toHaveBeenCalledWith('button__find_friends');
      expect(config.getString).toHaveBeenCalledWith('text__no_friends');
    });


  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



