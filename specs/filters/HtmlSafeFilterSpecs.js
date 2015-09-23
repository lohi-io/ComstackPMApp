(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

describe('htmlsafe filter', function() {
  var htmlsafe, $sce, untrustedString;

  beforeEach(module('ComstackPMApp'));
  beforeEach(inject(function(_$sce_, htmlsafeFilter) {
    htmlsafe = htmlsafeFilter;
    untrustedString = '<p>Untrusted</p>';
    $sce = _$sce_;
  }));

  it('Should mark a string as HTML safe', function () {
    spyOn($sce, 'trustAsHtml');
    htmlsafe(untrustedString);

    expect($sce.trustAsHtml.calls.count()).toEqual(1);
  });
});
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);
