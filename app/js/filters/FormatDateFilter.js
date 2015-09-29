app.filter('formatDate', ['$window', function($window) {
  'use strict';

  /**
   * Formats a UNIX timestamp according to a given format string.
   * @param {string} timestamp
   *   The UNIX timestamp to be format.
   * @param {string} formatString
   *   The template the timestamp should be formatted to.
   * @return formattedDate
   */
  return function(timestamp, formatString) {
    if (typeof formatString !== 'string') {
      formatString = 'hh:mm MMMM Do, YYYY';
    }
    return $window.moment(timestamp).format(formatString);
  };
}]);
