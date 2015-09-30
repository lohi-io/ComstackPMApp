/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach) {
  describe('UserService', function() {
    var mockBackend, loader, config;

    beforeEach(angular.mock.module("ComstackPMApp.Services"));
    beforeEach(angular.mock.module("ComstackPMApp.ServicesMock"));

    beforeEach(inject(function($injector,$httpBackend) {

      mockBackend = $injector.get('$httpBackend');
      loader = $injector.get('getCurrentUser');
      config =  $injector.get('configurationService');
    }));



    it('Should load current user using configurationService', function() {
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
      var url = config.appSettings.api_url+'/cs-pm/users/current-user?access_token='+config.appSettings.access_token;
      mockBackend.expectGET(url).respond(response);
      var promise = loader.get();
      promise.then(function(rec) {
        result = rec;
      });


      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });
  });
})(describe, it, expect, inject, angular, beforeEach);
