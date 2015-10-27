/**
 * Combines consecutive instances of whitespace in a string into a single space.
 *
 * This will replace all whitespace types, including new lines and tabs.
 * @param {string} message
 *  The string to squish (e.g. 'Hello,      World').
 * @param {boolean} stripHTMLTags
 *  Flag indicating whether to remove HTML tags from message.
 * @return {string}
 *   message, but with all series of whitespace combined (e.g. 'Hello, World').
 */
app.filter('squish', [function() {
  'use strict';

  return function(message, stripHTMLTags) {
    var sanitised = message;

    if (typeof message !== 'string') {
      return message;
    }

    if (stripHTMLTags === undefined) {
      stripHTMLTags = true;
    }

    if (stripHTMLTags) {
      sanitised = sanitised.replace(/<[^>]+>/gm, '');
    }

    return sanitised.replace(/(\s+)/g, ' ');
  };
}]);
