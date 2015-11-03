/* globals describe, it, expect, inject, beforeEach */
(function (describe, it, expect, inject, angular, beforeEach) {
  describe('UserService', function() {
    var mockBackend, loaderCurrentUser, config, loaderAvailableUsers, User;
    var result, accessToken, urlApi, queryString;

    beforeEach(angular.mock.module('ComstackPMApp.Services'));
    beforeEach(angular.mock.module('ComstackPMApp.ServicesMock'));

    beforeEach(inject(function($injector) {


      mockBackend = $injector.get('$httpBackend');
      loaderCurrentUser = $injector.get('getCurrentUser');
      loaderAvailableUsers = $injector.get('getAvailableUsers');
      config =  $injector.get('configurationService');
      User = $injector.get('User');

      accessToken = config.getSetting('access_token');
      urlApi = config.getSetting('api_url');
      queryString = '?access_token='+accessToken;

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



      var url = urlApi+'/cs-pm/users/current-user?access_token='+accessToken;
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
      var enpPoint = urlApi+'/cs-pm/users/available-users';

      mockBackend.expectGET(enpPoint+queryString +'&autocomplete%5Bstring%5D=test').respond(response);

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

      var url = urlApi + '/cs-fr/blocked';

      mockBackend.expectGET(url + queryString).respond(blockedUsers);

      User.getBlockedUsers().$promise.then(function(response) {
        result = response;
      });
      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, blockedUsers)).toBeTruthy();
    });

    it('Should block users', function() {
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

      var url = urlApi + '/cs-fr/blocked';


      mockBackend.expectPOST(url + queryString, {user: 1}).respond(blockedUsers);

      User.block({user: 1}).$promise.then(function(response) {
        result = response;
      });
      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, blockedUsers)).toBeTruthy();
    });

    it('Should unblock users', function() {
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

      var url = urlApi + '/cs-fr/blocked/1';

      mockBackend.expectDELETE(url + queryString).respond(blockedUsers);

      User.unblock({"id": 1}).$promise.then(function(response) {
        result = response;
      });
      expect(result).toBeUndefined();
      mockBackend.flush();
      expect(angular.equals(result, blockedUsers)).toBeTruthy();
    });

  });
})(describe, it, expect, inject, angular, beforeEach);
