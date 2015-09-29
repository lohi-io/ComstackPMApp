(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {
  'use strict';

  describe('formatDate filter', function() {
    var formatDate, moment, timestamp, $window, Moment;

    beforeEach(module('ComstackPMApp'));
    beforeEach(inject(function(formatDateFilter, _$window_) {
      timestamp = (new Date()).getTime();

      Moment = {
        format: function (time) {
          return time;
        }
      };

      moment = function () {
        return Moment;
      };

      $window = _$window_;

      $window.moment = moment;

      formatDate = formatDateFilter;
    }));

    it('Should convert a timestamp to well-formatted date via Moment.js', function () {
      spyOn(Moment, 'format');
      spyOn($window, 'moment').and.callThrough();
      formatDate(timestamp);

      expect($window.moment).toHaveBeenCalledWith(timestamp);
      expect(Moment.format).toHaveBeenCalledWith('hh:mm MMMM Do, YYYY');
    });

    it('Should convert a timestamp to a given date format via Moment.js', function () {
      var expectedTimestamp = 'Format String';
      spyOn(Moment, 'format');
      spyOn($window, 'moment').and.callThrough();
      formatDate(timestamp, expectedTimestamp);

      expect($window.moment).toHaveBeenCalledWith(timestamp);
      expect(Moment.format).toHaveBeenCalledWith(expectedTimestamp);
    });
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);
