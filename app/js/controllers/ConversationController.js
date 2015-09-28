app.controller('ConversationCtrl', ['$scope', '$window', '$state', '$stateParams', '$filter', 'getCurrentUser', 'Conversations', 'configurationService',
  function ($scope, $window, $state, $stateParams, $filter, userService, Conversations, config) {

    var settings = config.get();
    /**
     * Determines the conversation heading used for this conversation.
     * @param conversation
     *   See Comstack API Conversation model.
     */
    $scope.computeHeading = function(conversation) {
      // use historical participants if participants array is empty
      var otherParticipants = conversation.data.participants;
      var otherParticipantNames = '';
      if (otherParticipants.length === 0) {
        otherParticipants = conversation.data.historical_participants;
      }

      // exclude current user from heading title
      otherParticipants = $filter('filter')(otherParticipants, { id: '!' + $scope.currentUser.user.id });

      angular.forEach(otherParticipants, function(participant, key) {
        var suffix = '';

        // if 2nd to last, add ' and '
        // if not last, add ', '
        if (key === otherParticipants.length - 2) {
          suffix = ' and ';
        } else if (key !== otherParticipants.length - 1) {
          suffix = ', ';
        }

        otherParticipantNames = otherParticipantNames + participant.name + suffix;
      });

      $scope.conversationHeading = config.getString('heading__conversation_with', { name: otherParticipantNames });
    };

    $scope.messages = {};
    $scope.paging = {};
    $scope.currentUser = {};
    $scope.conversationHeading = 'Conversation';

    userService.get()
      .then(function (data) {
        $scope.currentUser = data.data;

        Conversations.get({
          id: $stateParams.id,
          access_token: settings.access_token
        }).$promise.then(function(conversation) {
            $scope.computeHeading(conversation);
        });
      });

    Conversations.getMessages({
      id: $stateParams.id,
      access_token: settings.access_token
    }).$promise.then(function(messages) {
      $scope.messages = messages;
    });


  }
]);
