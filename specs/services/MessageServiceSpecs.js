/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach,module) {
  describe('MessageService', function() {
    var mockBackend, Conversation, config;

    beforeEach(angular.mock.module("ComstackPMApp.Services"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));

    beforeEach(inject(function($injector){
      mockBackend = $injector.get('$httpBackend');
      Message = $injector.get('Message');
      config =  $injector.get('configurationService');

    }));

    it('Should load messages for current user', function() {
      var response = {
        'data': []
      };
      var result;

      var url = config.appSettings.api_url+'/cs-pm/conversations/messages?access_token='+config.appSettings.access_token+'&after=&before=&range=10';
      mockBackend.expectGET(url).respond(response);
      var promise = Message.get().$promise;

      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });


  });
})(describe, it, expect, inject, angular, beforeEach, angular.mock.module);
