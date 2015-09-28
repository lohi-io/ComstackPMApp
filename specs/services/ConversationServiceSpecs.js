/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach,module) {
  describe('ConversationService', function() {
    var mockBackend, loader;

    beforeEach(angular.mock.module("ComstackPMApp.Services"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));

    beforeEach(inject(function($injector){
      mockBackend = $injector.get('$httpBackend');
      loader = $injector.get('getConversations');
      config =  $injector.get('configurationService');

    }));

    it('Should load conversation for current user using ConfigurationService', function() {
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

        var url = config.appSettings.api_url+'/cs-pm/conversations?access_token='+config.appSettings.access_token+'&page=1';
        mockBackend.expectGET(url).respond(response);
        var promise = loader.get(1);

        promise.then(function(rec) {
          result = rec;
        });

        expect(result).toBeUndefined();
        mockBackend.flush();
        expect(angular.equals(result, response)).toBeTruthy();
      });
  });
})(describe, it, expect, inject, angular, beforeEach, angular.mock.module);
