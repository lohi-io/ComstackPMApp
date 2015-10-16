'use strict';

// This is based on the aendrew/angular-emoji-directive, we should make a branch on githib because it has bugs
angular.module('ComstackPMApp.Directives', [])
  .directive('emoji', function () {
    return {

      restrict: 'EA',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$validators.emoji = function (modelValue, viewValue) {
//           Ranges via: http://apps.timwhitlock.info/emoji/tables/unicode

          var EMOJI_REGEXP = /(\ud83d[\ude01-\ude4f]|[\u2702-\u27b0]|\ud83d[\ude80-\udec0]|\ud83c[\udd70-\ude51]|[\u00A9-\u00AE]| [\u203C-\u2049]|[\u0030-\u0039]|[\u2122-\u21aa]|[\u231A-\u23F3]|[\u25AA-\u25FE]|[\u2600-\u26FD]|[\u2934-\u2935]|[\u2B05-\u2B55]|[\u3030-\u303D]|[\u3297-\u3299]|\ud83c[\udc04-\udff0]|\ud83d[\udc0c-\uddff]|\ud83d[\ude00-\ude36]|\ud83d[\ude81-\udec5]|\ud83c[\udf0d-\udfe4]|\ud83d[\udc00-\udd67])/g;

          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }
          if (!EMOJI_REGEXP.test(viewValue)) {
            // matches found
            return true;
          } else {
            // check if there is anything else
            var notMatched = viewValue.replace(EMOJI_REGEXP, '');
            if (/\S/.test(notMatched)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        };

        ctrl.$validators.emojiWarning = function (modelValue, viewValue) {
//           Ranges via: http://apps.timwhitlock.info/emoji/tables/unicode

          var EMOJI_REGEXP = /(\ud83d[\ude01-\ude4f]|[\u2702-\u27b0]|\ud83d[\ude80-\udec0]|\ud83c[\udd70-\ude51]|[\u00A9-\u00AE]| [\u203C-\u2049]|[\u0030-\u0039]|[\u2122-\u21aa]|[\u231A-\u23F3]|[\u25AA-\u25FE]|[\u2600-\u26FD]|[\u2934-\u2935]|[\u2B05-\u2B55]|[\u3030-\u303D]|[\u3297-\u3299]|\ud83c[\udc04-\udff0]|\ud83d[\udc0c-\uddff]|\ud83d[\ude00-\ude36]|\ud83d[\ude81-\udec5]|\ud83c[\udf0d-\udfe4]|\ud83d[\udc00-\udd67])/g;

          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }
          if (!EMOJI_REGEXP.test(viewValue)) {
            // matches found
            return true;
          } else {
            // check if there is anything else
            var notMatched = viewValue.replace(EMOJI_REGEXP, '');
            if (/\S/.test(notMatched)) {
              return false;
            } else {
              return true;
            }
          }

          return true;
        };


      }
    };
  });
