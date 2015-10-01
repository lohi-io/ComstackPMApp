app.controller('ConversationCtrl', ['$scope', '$window', '$state', '$stateParams', '$filter', '$sce', 'getCurrentUser', 'Conversation', 'configurationService',
  function ($scope, $window, $state, $stateParams, $filter, $sce, userService, Conversation, config) {

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

    $scope.computeStrings = function() {
      $scope.text_read_only = config.getString('text__read_only', {name: $scope.currentUser.user.name, user_id: $scope.currentUser.user.id});
      $scope.form__new_conversation__submit = config.getString('form__new_conversation__submit', {});
      $scope.link__delete = config.getString('link__delete', {});
      $scope.link__report = config.getString('link__report', {});
      $scope.link__block = config.getString('link__block', {});
      $scope.heading__messages = config.getString('heading__messages', {});
      $scope.button__new_conversation = config.getString('button__new_conversation', {});
      $scope.button__load_older_messages = config.getString('button__load_older_messages', {});
      $scope.text__select_messages_to_delete = config.getString('text__select_messages_to_delete', {});
    };

    $scope.messages = {};
    $scope.paging = {};
    $scope.currentUser = {};
    $scope.conversationHeading = 'Conversation';

    // Fetch the current user.
    userService.get()
      .then(function (data) {
        $scope.currentUser = data.data;

        $scope.computeStrings();

        // Load the messages within the current conversation.
        // This needs to happen after we get the current user
        // as we need to know the current user as well as the other
        // participants to calculate the heading.
        Conversation.get({
          id: $stateParams.id,
          access_token: settings.access_token
        }).$promise.then(function(conversation) {
            $scope.computeHeading(conversation);
        });

      });

    Conversation.getMessages({
      id: $stateParams.id,
      access_token: settings.access_token
    }).$promise.then(function(messages) {
      $scope.messages = messages;
    });


  }
]);
