/**
 * Truncates a string to a given length and appends a suffix.
 *
 * @param {string} message
 *   The message to truncate.
 * @param {int} limit
 *   The new length of the string.
 * @param {string} suffix
 *   OPTIONAL string to be added to the raw truncated string.
 */
app.filter('truncate', [function() {
  return function(message, limit, suffix) {
    var truncated = message;

    if (angular.isUndefined(message)) {
      return '';
    }

    if (angular.isUndefined(suffix)) {
      suffix = '...';
    }

    if (truncated.length > limit) {
      truncated = truncated.substr(0, limit) + suffix;
    }

    return truncated;
  };
}]);
