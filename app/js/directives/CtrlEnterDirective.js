var directives = angular.module('ComstackPMApp.Directives');
directives.directive('ctrlEnter', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      element.bind('keydown keypress', function (event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
          if (event.ctrlKey) {
            if (ctrl.$valid || (!ctrl.$valid && Object.keys(ctrl.$error).length == 1 && ctrl.$error.emojiWarning !== undefined)) {
              scope.$apply(function () {
                scope.$eval(attrs.ctrlEnter, {$event: event});
              });
            }
            //event.preventDefault();
          }
        }
      });
    }
  }
});
