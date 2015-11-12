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

    $window.moment.locale('en', {
      relativeTime : {
        future: "just now",
        past:   "%s ago",
        s:  "seconds",
        m:  "a minute",
        mm: "%d minutes",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
      }
    });

    return $window.moment(timestamp).fromNow();
  };
}]);
