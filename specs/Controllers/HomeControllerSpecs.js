/* jshint undef: true, unused: true */
/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

    describe('HomeCtrl', function () {
        var ctrl, scope;

        beforeEach(module('ComstackPmApp'));

        beforeEach(inject(function(_$rootScope_, $controller)
        {
            scope = _$rootScope_.$new();
            ctrl = $controller('HomeCtrl', {
                '$scope': scope
            });
        }));
        it('Should define a message', function () { expect(scope.message).toEqual("Home Page"); });
    });



})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



