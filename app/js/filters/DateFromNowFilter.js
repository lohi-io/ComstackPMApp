app.filter('dateFromNow', ['$window', function($window) {
  'use strict';

  /**
   * Converts a UNIX timestamp to a relative timestamp.
   *
   * Examples of a relative timestamp: '3 months ago', '1 hour ago' etc.
   * @param {string} timestamp
   *   The timestamp to convert.
   * @return relativeTimestamp
   */
  return function(timestamp) {
    return $window.moment(timestamp).fromNow();
  };
}]);
