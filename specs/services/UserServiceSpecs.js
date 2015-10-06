/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach) {
  describe('UserService', function() {
    var mockBackend, loaderCurrentUser, config, loaderAvailableUsers, User;

    beforeEach(angular.mock.module('ComstackPMApp.Services'));
    beforeEach(angular.mock.module('ComstackPMApp.ServicesMock'));

    beforeEach(inject(function($injector) {

      mockBackend = $injector.get('$httpBackend');
      loaderCurrentUser = $injector.get('getCurrentUser');
      loaderAvailableUsers = $injector.get('getAvailableUsers');
      config =  $injector.get('configurationService');
      User = $injector.get('User');
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
      var promise = loaderCurrentUser.get();
      promise.then(function(rec) {
        result = rec;
      });


      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    it('Should load available users using configurationService', function() {
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
      var enpPoint = config.appSettings.api_url+'/cs-pm/users/available-users';
      var queryString = '?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc&autocomplete%5Bstring%5D=test';
      mockBackend.expectGET(enpPoint+queryString).respond(response);

      var promise = loaderAvailableUsers.get('test');
      promise.then(function(rec) {
        result = rec;
      });


      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, response)).toBeTruthy();
    });

    it('Should load blocked users', function() {
      var blockedUsers = {
        data: [
          {
            id: 1,
            user: {
              id: 1,
              name: 'username'
            }
          }
        ]
      };

      var result;

      var url = config.appSettings.api_url + '/cs-fr/blocked';
      var queryString = '?access_token=qNlIfE4RskDFnAin9ycg1NipeSnCtqWLLLzqVXBJ6dc';

      mockBackend.expectGET(url + queryString).respond(blockedUsers);

      User.getBlockedUsers().$promise.then(function(response) {
        result = response;
      });
      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, blockedUsers)).toBeTruthy();
    });
  });
})(describe, it, expect, inject, angular, beforeEach);
