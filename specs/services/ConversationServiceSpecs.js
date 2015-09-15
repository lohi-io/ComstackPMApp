/**
 * Created by fechit01 on 15/09/2015.
 */
(function (describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, module) {

    describe('ConversationService', function() {

        beforeEach(angular.mock.module("ComstackPmApp.Services", function ($provide) {
            $provide.constant("ApiUrl", "https://cancerchat01dev.prod.acquia-sites.com/api/v1");
            $provide.constant("AccessToken", "qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc");
        }));


        var mockBackend, user, loader, resource;
        beforeEach(inject(function($injector)
        {
            mockBackend = $injector.get('$httpBackend');
            resource = $injector.get('Conversation');
            loader = $injector.get('GetConversations');
        }));


        it('Should load conversation for current user', function()
        {
            var response = {"data":{"user":{"type":"user","id":66531,"name":"basic_user_1"}}};
            var result;

            mockBackend.expectGET('https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc').respond(response);
            var promise = loader();
            promise.then(function(rec) { result = rec; });

            expect(result).toBeUndefined();
            mockBackend.flush();
            expect(angular.equals(result, response)).toBeTruthy();
        });
    });

})(describe, it, expect, inject, angular, beforeEach, afterEach, spyOn, angular.mock.module);