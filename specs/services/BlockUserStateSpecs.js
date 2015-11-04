(function (describe, it, expect, inject, angular, beforeEach) {
  describe('BlockUserState', function () {
    var service, state, modal, promise, successHandler, rejectHandler, templateUrl, okDestination, cancelDestination;

    beforeEach(angular.mock.module("ComstackPMApp"));
    beforeEach(angular.mock.module("ComstackPMApp.Services"));


    beforeEach(function () {
      promise = {
        then: function (success, reject) {
          successHandler = success;
          rejectHandler = reject;
        }
      }
      state = {
        "go": function () {
        }
      };
      spyOn(state, 'go');
      modal = {
        open: function () {
          return {
            result: promise
          }
        }
      };
      templateUrl = '/app/html/blockUser.html';
      okDestination = {state: 'okState', params: {id: 1}};
      cancelDestination = {state: 'cancelState', params: {id: 2}};


      service = new blockUserState(state, modal);

      spyOn(modal, 'open').and.callThrough();
    });

    it('Should provide method to activate state', function () {
      expect(service.activate).toBeDefined();
      expect(typeof service.activate).toBe('function');
    });

    it('Should use modal service on activate', function () {
      service.activate(templateUrl, okDestination, cancelDestination);
      expect(modal.open).toHaveBeenCalledWith(
        {
          templateUrl: '/app/html/blockUser.html',
          controller: 'BlockUserCtrl',
          backdrop: 'static',
          size: 'sm',
          windowClass: 'cs-pm-modal',
          backdropClass: 'cs-pm-modal-backdrop'
        });
    });

    it('Should subscribe to promise returned by $modal service on activate', function () {
      spyOn(promise, 'then');
      service.activate(templateUrl, okDestination, cancelDestination);
      expect(promise.then).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    });

    it('Should transition to dashboard on successful sign in', function () {
      service.activate(templateUrl, okDestination, cancelDestination);
      successHandler(true);
      expect(state.go).toHaveBeenCalledWith('okState', {id: 1}, {
        reload: 'okState',
        inherit: false,
        notify: true
      });
    });

    it('Should transition to home on cancelled sign in', function () {
      service.activate(templateUrl, okDestination, cancelDestination);
      rejectHandler();
      expect(state.go).toHaveBeenCalledWith('cancelState', {id: 2});
    });


  });
})(describe, it, expect, inject, angular, beforeEach);
