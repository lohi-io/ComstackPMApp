(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

  describe('squish filter', function() {
    var squish;

    beforeEach(module('ComstackPMApp'));
    beforeEach(inject(function(squishFilter) {
      squish = squishFilter;
    }));

    it('Should remove excessive spaces from a string', function () {
      var squished = squish('Lots of       spaces');

      expect(squished).toEqual('Lots of spaces');
    });

    it('Should return its input with no changes if the input is not a string', function () {
      var notAString = ['Some', 'elements', 1];
      var squished = squish(notAString);

      expect(squished).toEqual(notAString);
    });

    it('Should remove HTML tags if no argument is supplied', function () {
      var tagsInAString = 'This is a <br /> tag';
      var squished = squish(tagsInAString);

      expect(squished).toEqual('This is a tag');
    });
  });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);
