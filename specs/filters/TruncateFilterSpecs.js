/* global describe, it, expect, inject, beforeEach, module */
(function (describe, it, expect, inject, beforeEach, module) {

  describe('truncate filter', function () {
    var truncate, limit, shortString, longString, suffix;

    beforeEach(module('ComstackPMApp'));

    beforeEach(inject(function(truncateFilter) {
      truncate = truncateFilter;
      shortString = '<p>Some text</p>';
      longString = '<p>This is a reply to a conversation, it should be long enough to truncate.</p>';
      suffix = '...';
      limit = 70;
    }));

    it('Should add a suffix to the end of the string if it was truncated', function () {
      var changedString = truncate(longString, limit, suffix);
      var changedStringEmptySuffix = truncate(longString, limit, '');
      expect(changedString).toEqual(changedStringEmptySuffix + suffix);
    });

    it('Should not add a suffix if no truncation was needed', function () {
      var changedString = truncate(shortString, limit, suffix);

      expect(changedString).toEqual(shortString);
    });

    it('Should add ellipsis by default if no suffix is provided', function () {
      var changedString = truncate(longString, limit);
      var changedStringEmptySuffix = truncate(longString, limit, '');
      expect(changedString).toEqual(changedStringEmptySuffix + '...');
    });

    it('Should truncate a string to a given limit', function () {
      var changedString = truncate(longString, limit, suffix);

      expect(changedString.length).toEqual(limit + suffix.length);
    });
  });
})(describe, it, expect, inject, beforeEach, angular.mock.module);
