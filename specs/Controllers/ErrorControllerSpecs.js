/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('ErrorConversationCtrl', function () {
    var ctrl, scope, rootScope, modalInstance, error;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, $injector) {
      rootScope = _$rootScope_;

      config = $injector.get('configurationService');
      error = {
        data: {
                detail: "error detail",
                status: 123,
                title: "error title"
              },
        status: 123
      };

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
      ctrl = $controller('ErrorCtrl', {
        '$scope': scope,
        'config': config,
        '$modalInstance': modalInstance,
        'error': error
      });

    }));

    it('Should have a error in scope', function () {
      expect(scope.error).toBeDefined();
      expect(typeof scope.error).toEqual('object');
      expect(scope.error).toEqual(error);
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
      expect(config.getString.calls.count()).toBe(6);
      expect(config.getString).toHaveBeenCalledWith('button__ok');
      expect(config.getString).toHaveBeenCalledWith('modal__error__heading');
      expect(config.getString).toHaveBeenCalledWith('error__api_bad_response');
      expect(config.getString).toHaveBeenCalledWith('error__details', {status: scope.error.data.status, error: scope.error.data.title});
      expect(config.getString).toHaveBeenCalledWith('error__hide_text');
      expect(config.getString).toHaveBeenCalledWith('error__show_text');
    });

    //it('Should get the strings from configuration when no status', function(){
    //  expect(config.getString.calls.count()).toBe(3);
    //  expect(config.getString).toHaveBeenCalledWith('button__ok');
    //  expect(config.getString).toHaveBeenCalledWith('modal__error__heading');
    //  expect(config.getString).toHaveBeenCalledWith('error__no_connection');
    //});

  });


  describe('ErrorConversationCtrl - no connection', function () {
    var ctrl, scope, rootScope, modalInstance, error;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));


    beforeEach(inject(function (_$rootScope_, $controller, _$httpBackend_, $injector) {
      rootScope = _$rootScope_;

      config = $injector.get('configurationService');


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
      ctrl = $controller('ErrorCtrl', {
        '$scope': scope,
        'config': config,
        '$modalInstance': modalInstance,
        'error': {status:0}
      });

    }));



    it('Should get the strings from configuration when no status', function(){
      expect(config.getString.calls.count()).toBe(3);
      expect(config.getString).toHaveBeenCalledWith('button__ok');
      expect(config.getString).toHaveBeenCalledWith('modal__error__heading');
      expect(config.getString).toHaveBeenCalledWith('error__no_connection');
    });

  });

})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



