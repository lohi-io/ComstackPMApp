(function (describe, it, expect, inject, angular, beforeEach) {
  describe('ConfigurationServiceProvider', function () {
    var mockBackend, configurationService, baseUrl;

    beforeEach(angular.mock.module("ComstackPMApp"));


    beforeEach(inject(function ($injector) {
      configurationService = $injector.get('configurationService');
      baseUrl = 'https://cancerchat01dev.prod.acquia-sites.com';
    }));


    it('Should set the settings values', function () {
      configurationService.setSettingValue('access_token', '1234');
      var appSettings = configurationService.get();
      expect(appSettings.access_token).toEqual("1234");
    });

    it('Should merge the local settings with the global settings if they exists', function () {

      var appSettings = configurationService.get();

      expect(appSettings.api_url).toEqual('global url');
      expect(appSettings.authorization_header).toEqual('Basic Q1JVSzAxOnl1RGFiOG5lIQ==');
      expect(appSettings.access_token).toEqual('newToken');
      expect(appSettings.base_url).toEqual(baseUrl);
      expect(appSettings.strings.heading__messages).toEqual('Messages');
      expect(appSettings.strings.text__read_only).toEqual('You are @name@ with @user_id@');

    });

    it('Should replace the place holders for the strings', function(){
      var result = configurationService.getString("text__read_only", {name: "my name", user_id: "1234"});
      expect(result).toEqual("You are my name with 1234");
    });

    it('Should fetch app settings', function() {
      var result = configurationService.getSetting('base_url');
      expect(result).toEqual(baseUrl);
    });

    it('Should fetch nested app settings', function() {
      var result = configurationService.getSetting(['a', 'very', 'nested', 'property']);
      expect(result).toEqual(1053);
    });

    it('Should return an empty string if no key given', function() {
      var result = configurationService.getSetting();
      expect(result).toEqual('');
    });
  });
})(describe, it, expect, inject, angular, beforeEach);
