/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('ErrorConversationCtrl', function () {
    var ctrl, scope, state, $httpBackend, rootScope, modalInstance;

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
        'error': {status_code: 222, status_text: "sdfgsdfgdf"}
      });

    }));


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
      expect(config.getString).toHaveBeenCalledWith('modal__error__heading');
    });
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



