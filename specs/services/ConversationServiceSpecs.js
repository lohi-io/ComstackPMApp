/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach) {
  describe('ConversationService', function() {
    var mockBackend, loader;

    beforeEach(angular.mock.module('ComstackPmApp.Services', function ($provide) {
      $provide.constant('ApiUrl', 'https://cancerchat01dev.prod.acquia-sites.com/api/v1');
      $provide.constant('AccessToken', 'qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc');
    }));

    beforeEach(inject(function($injector){
      mockBackend = $injector.get('$httpBackend');
      loader = $injector.get('GetConversations');
    }));

    it('Should load conversation for current user', function() {
        var response = {
          'data': {
            'user': {
              'type': 'user',
              'id': 66531,
              'name': 'basic_user_1'
            }
          }
        };
        var result;

        /* eslint-disable max-len */
        mockBackend.expectGET('https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc').respond(response);
        /* eslint-enable max-len */
        var promise = loader();
        promise.then(function(rec) {
          result = rec;
        });

        expect(result).toBeUndefined();
        mockBackend.flush();
        expect(angular.equals(result, response)).toBeTruthy();
      });
  });
})(describe, it, expect, inject, angular, beforeEach);
