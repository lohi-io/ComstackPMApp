/* jshint undef: true, unused: true */
/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

    describe('InboxCtrl', function () {
        var ctrl, scope, currentUser, conversations;

        beforeEach(module('ComstackPmApp'));

        beforeEach(inject(function(_$rootScope_, $controller)
        {
            currentUser = {"data":{"user":{"type":"user","id":66531,"name":"basic_user_1"}}};
            conversations = {"data":{"user":{"type":"user","id":66531,"name":"basic_user_1"}}};

            scope = _$rootScope_.$new();
            ctrl = $controller('InboxCtrl', {
                '$scope': scope,
                'currentUser':currentUser,
                'conversations': conversations
            });
        }));
        it('Should have current user in scope', function () { expect(scope.currentUser).toEqual(currentUser); });
        it('Should have conversations in scope', function () { expect(scope.conversations).toEqual(conversations.data); });
    });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



