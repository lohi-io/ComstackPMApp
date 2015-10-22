(function (describe, it, expect, inject, angular, beforeEach) {
  describe('ErrorState', function () {
    var service, state, modal, promise, successHandler, rejectHandler, templateUrl,injector, error;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.Services"));


    beforeEach(function () {
      promise = {
        then: function (success, reject) {
          successHandler = success;
          rejectHandler = reject;
        }
      }
      templateUrl = '/app/html/error.html';
      //$injector = _$injector_;
      modal = {
        open: function () {
          return {
            result: promise
          }
        }
      };

      error = {};

      injector = {get: function(){return modal}};


      service = new errorState(injector, error);
      spyOn(injector, 'get').and.callThrough();
      spyOn(modal, 'open').and.callThrough();
    });

    it('Should provide method to activate state', function () {
      expect(service.activate).toBeDefined();
      expect(typeof service.activate).toBe('function');
    });

    it('Should use modal service on activate', function () {
      service.activate(templateUrl, {});
      expect(modal.open).toHaveBeenCalledWith(
        {
          templateUrl: '/app/html/error.html',
          controller: 'ErrorCtrl',
          resolve: {error: {}},
          backdrop: 'static',
          size: 'sm'
        });
    });



  });
})(describe, it, expect, inject, angular, beforeEach);
