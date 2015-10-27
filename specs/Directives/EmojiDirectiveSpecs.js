/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {


  describe('EmojiDirective', function () {
    var $scope, form;

    beforeEach(angular.mock.module("ComstackPMApp.Directives"));

    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope;

      var element = angular.element(
        '<form name="form"><textarea ng-model="model.text" name="message" required="true" emoji/></form>');

      $scope.model = {text: null}
      $compile(element)($scope);
      form = $scope.form;
    }));

    it('Should be invalid when text contains only emoji', function () {
      form.message.$setViewValue('☺ 😉 😍');
      $scope.$digest();
      expect(form.message.$valid).toBe(false);
      expect(form.message.$error.emoji).toBe(true);

    });

    it('Should be value when text contains only emoji', function () {
      form.message.$setViewValue('test');
      $scope.$digest();
      expect(form.message.$valid).toBe(true);
    });

    it('Should be value when text contains only emoji and text', function () {
      form.message.$setViewValue('😊 ☺ 😉 test');
      $scope.$digest();
      expect(form.message.$valid).toBe(false);
    });
  });


})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



