(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {
  'use strict';

  describe('dateFromNow filter', function() {
    var dateFromNow, moment, timestamp, $window, Moment;

    beforeEach(module('ComstackPMApp'));
    beforeEach(inject(function(_$sce_, dateFromNowFilter, _$window_) {
      timestamp = (new Date()).getTime();

      Moment = {
        _d: 'foo',
        fromNow: function (time) {
          return time;
        }
      };

      moment = function () {
        return Moment;
      };


      $window = _$window_;

      $window.moment = moment;

      dateFromNow = dateFromNowFilter;
    }));

    it('Should convert a timestamp to a relative timestamp via Moment.js', function () {
      spyOn(Moment, 'fromNow');
      spyOn($window, 'moment').and.callThrough();
      dateFromNow(timestamp);

      expect($window.moment).toHaveBeenCalledWith(timestamp);
      expect(Moment.fromNow).toHaveBeenCalledWith();
    });
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);
