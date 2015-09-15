/* global describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module, kendo */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

    describe('InboxCtrl', function () {
        var ctrl, scope, currentUser, conversations, state, stateParams;

        beforeEach(module('ComstackPmApp'));

        beforeEach(inject(function(_$rootScope_, $controller)
        {
            currentUser = {"data":{"user":{"type":"user","id":66531,"name":"basic_user_1"}}};
            conversations = {"data":[], "previous":{}, "next":{} };
            state = { "go": function () { } };
            stateParams = { page: 1 };
            scope = _$rootScope_.$new();
            ctrl = $controller('InboxCtrl', {
                '$scope': scope,
                'currentUser':currentUser,
                'conversations': conversations,
                '$state': state,
                '$stateParams': stateParams
            });
        }));

        it('Should have current user in scope', function () { expect(scope.currentUser).toEqual(currentUser); });
        it('Should have conversations in scope', function () { expect(scope.conversations).toEqual(conversations.data); })

        it('Should have a goToPage() function', function () {
            expect(scope.goToPage).toBeDefined();
            expect(typeof scope.goToPage).toEqual("function");
        });

        it('Should have change the state when calling goToPage() function', function () {
            spyOn(state, 'go');
            scope.goToPage(2);
            expect(state.go).toHaveBeenCalledWith('inbox', {page: 2});
        });

        it('Should have a previous() function', function () {
            expect(scope.previous).toBeDefined();
            expect(typeof scope.previous).toEqual("function");
        });

        it('should change state if previous exists when calling previous() function ', function () {
            scope.conversations = {"data":[], "previous":{} };
            scope.currentPage = 2;
            spyOn(state, 'go');
            scope.previous();
            expect(state.go).toHaveBeenCalledWith('inbox', {page: 1});
        });

        it('should not change state if previous does not exists when calling previous() function ', function () {
            scope.conversations = {"data":[], "next":{} };
            scope.currentPage = 1;
            spyOn(state, 'go');
            scope.previous();
            expect(state.go.calls.count()).toEqual(0);;
        });

        it('Should have a next() function', function () {
            expect(scope.next).toBeDefined();
            expect(typeof scope.next).toEqual("function");
        });

        it('should change state if next exists when calling next() function ', function () {
            scope.conversations = {"data":[], "next":{} };
            scope.currentPage = 2;
            spyOn(state, 'go');
            scope.next();
            expect(state.go).toHaveBeenCalledWith('inbox', {page: 3});
        });

        it('should not change state if next does not exists when calling next() function ', function () {
            scope.conversations = {"data":[], "previous":{} };
            scope.currentPage = 1;
            spyOn(state, 'go');
            scope.next();
            expect(state.go.calls.count()).toEqual(0);;
        });

    });
})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);



