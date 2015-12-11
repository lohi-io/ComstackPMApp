(function (angular) {
  var services = angular.module('ComstackPMApp.Services');
  services.factory('Alert', ['$rootScope', 'Conversation', 'configurationService', 'getCurrentUser', '$log', '$state',
    function ($rootScope, Conversation, ConfigurationService, UserService, $log, $state) {

      var alertsBroadcaster = {
        message: '',

        /**
         * Updates the latest action.
         * @param {string} type
         *   The type of the event being alerted. This is either 'blocked' or 'reported'
         * @param {int} affected
         *   The ID of the entity that was affected by the action.
         */
        notify: function (type, affected) {
          if (typeof type !== 'string') {
            $log.warn('AlertService#notify called with invalid type. Refusing to update message.');
            return;
          }

          if (type === 'reported') {
            var currentUser;
            UserService.get().then(function (response) {
              currentUser = response.data;
              Conversation.get({
                id: affected
              }).$promise.then(function (response) {
                var otherParticipantNames = Conversation.getOtherParticipantsNames(response.data, currentUser);
                alertsBroadcaster.message = ConfigurationService.getString('text__report_success', {
                  participants: otherParticipantNames
                });
              });
            });
          }
        },
        resetState: function () {
          alertsBroadcaster.message = '';
        }
      };

      /**
       * Determines if two states are in a parent-child relationship.
       *
       * Changing the order of the parameters will not alter output.
       * @param stateOne
       * @param stateTwo
       */
      var isParentChildStates = function (stateOne, stateTwo) {
        var firstStateLevels = stateOne.split('.');
        var secondStateLevels = stateTwo.split('.');
        var leastLevels = [];
        var i = 0;

        // Check if both states have the same level of nesting.
        if (firstStateLevels.length === secondStateLevels.length) {
          return false;
        }

        // Loop through the state with the fewest number of levels and compare to the levels of the other state.
        if (firstStateLevels.length < secondStateLevels.length) {
          leastLevels = firstStateLevels;
        } else {
          leastLevels = secondStateLevels;
        }

        for (; i < leastLevels.length; i++) {
          if (firstStateLevels[i] !== secondStateLevels[i]) {
            return false;
          }
        }

        return true;
      };

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        $log.info($state.$current.name);
        $log.info($state.includes(toState.name));
        $log.info($state.includes.call(toState, $state.$current));
        $log.info('FROM: ' + fromState.name + '; TO: ' + toState.name);
        // Unless we're going between a child state and a parent state, erase the message.
        if (!$state.includes(toState.name) && !$state.includes.call(toState, $state.$current)) {
          //!isParentChildStates(toState.name, fromState.name)) {
          alertsBroadcaster.resetState();
        }
      });

      alertsBroadcaster.resetState();

      return alertsBroadcaster;
    }]);
})(angular);