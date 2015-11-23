//**
// * Created by fechit01 on 11/09/2015.
// */
(function (angular) {
  'use strict';
  var services = angular.module('ComstackPMApp.Services');

  services.factory('pollerRegistration', ['$rootScope', '$filter',
    function ($rootScope, $filter) {


      this.unregisterPollers = function (state) {
        $rootScope.pollers.forEach(function (poller) {
          if (poller.state != state) {
            poller.started = false;
          }
        });
      };

      this.registerPoller = function (name, state) {
        var found = $filter('filter')($rootScope.pollers, {state: state});
        found = $filter('filter')(found, {name: name});
        if (found.length == 0) {
          var poller = {
            name: name,
            state: state,
            started: true,
          };
          $rootScope.pollers.push(poller);
        }
        this.unregisterPollers(state);
      };



      return {
        registerPoller: this.registerPoller,
        unregisterPollers: this.unregisterPollers
      }
    }
]);})(angular);

