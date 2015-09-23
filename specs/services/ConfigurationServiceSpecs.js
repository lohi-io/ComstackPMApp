(function (describe, it, expect, inject, angular, beforeEach) {
  describe('ConfigurationService', function () {
    var mockBackend, configurationService, localSettings;

    beforeEach(angular.mock.module("ComstackPMApp.Services"));
    beforeEach(angular.mock.module("ComstackPMApp.ConfigurationMockModule"));


    beforeEach(inject(function ($injector, $httpBackend) {
      mockBackend = $injector.get('$httpBackend');
      configurationService = $injector.get('ConfigurationService');
      localSettings = $injector.get('LocalSettings');

    }));

    it('Should load current user using LocalSettings', function () {
      var appSettings = configurationService.get();
      expect(appSettings).toEqual(localSettings);
    });


    it('Should set the access_token', function () {
      configurationService.updateAccessToken("accessToken");
      var appSettings = configurationService.get();
      expect(appSettings.access_token).toEqual("accessToken");
    });

    it('Should merge the local settings with the global settings if they exists', function () {
      var mergeResult = {
        "api_url": "global url",
        "authorization_header": "Basic Q1JVSzAxOnl1RGFiOG5lIQ==",
        "access_token": "newToken",
        "base_url": "baseUrl"
      };
      var appSettings = configurationService.get();
      expect(appSettings).toEqual(mergeResult);

    });
  });
})(describe, it, expect, inject, angular, beforeEach);
