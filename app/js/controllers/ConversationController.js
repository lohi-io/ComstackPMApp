app.controller('ConversationCtrl', ['$scope', '$window', '$state', '$stateParams', '$filter', '$sce', 'getCurrentUser',
  'User', 'Conversation', 'configurationService',
  function ($scope, $window, $state, $stateParams, $filter, $sce, getCurrentUser, User, Conversation, config) {

    var settings = config.get();
    /**
     * Determines the conversation heading used for this conversation.
     * @param conversation
     *   See Comstack API Conversation model.
     */
    $scope.computeHeading = function(conversation) {
      // use historical participants if participants array is empty
      var otherParticipants = conversation.participants;
      var otherParticipantNames = '';
      if (otherParticipants.length === 0) {
        otherParticipants = conversation.historical_participants;
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

      $scope.conversationHeading = config.getString('heading__conversation_with', { participants: otherParticipantNames });
    };

    $scope.computeStrings = function() {
      $scope.text_read_only = config.getString('text__read_only', {
        name: $scope.currentUser.user.name,
        user_id: $scope.currentUser.user.id
      });
      $scope.form__new_conversation__submit = config.getString('form__new_conversation__submit', {});
      $scope.link__delete = config.getString('link__delete', {});
      $scope.link__report = config.getString('link__report', {});
      $scope.link__block = config.getString('link__block', {});
      $scope.heading__messages = config.getString('heading__messages', {});
      $scope.button__new_conversation = config.getString('button__new_conversation', {});
      $scope.button__load_older_messages = config.getString('button__load_older_messages', {});
      $scope.text__select_messages_to_delete = config.getString('text__select_messages_to_delete', {});
    };

    /**
     * Sets the states of availability for the contact.
     *
     * The two states this affects are:
     *  - $scope.isContactAvailable
     *    -> This is true if and only if the contact is friends with the current user
     *       and has private messaging enabled.
     *  - $scope.isContactBlocked
     *    -> This is true if and only if the contact is not found in the current user's
     *       available contacts.
     * @param conversation
     *  The current conversation.
     */
    $scope.computeAvailability = function(conversation) {
      if (angular.isUndefined($scope.currentUser.user)) {
        $scope.isContactAvailable = false;
        $scope.isContactBlocked = false;
        return;
      }

      var contacts = $filter('filter')(conversation.participants, { id: '!' + $scope.currentUser.user.id });
      var contactId = contacts[0].id;

      User.getBlockedUsers({
        'filter[user]': contactId
      }).$promise.then(function(blockedUsers) {
        $scope.isContactBlocked = blockedUsers.hasOwnProperty('data') &&
          $filter('filter')(blockedUsers.data, { user: { id: contactId } }).length === 1;

        // If contact is blocked, we won't be able to check if they are available, so assume they are not.
        if ($scope.isContactBlocked) {
          $scope.isContactAvailable = false;
          return;
        }

        User.getAvailableUsers({
          'filter[id]': contactId
        }).$promise.then(function(response) {
          // Check the response data only contains the contact's id.
          $scope.isContactAvailable = response.hasOwnProperty('data') &&
            $filter('filter')(response.data, { id: contactId }).length === 1;
        });
      });
    };

    $scope.goToInbox = function() {
      $state.go('inbox', {
        page: 1
      }, {
        reload: 'inbox'
      });
    };

    $scope.messages = {};
    $scope.paging = {};
    $scope.currentUser = {};
    $scope.conversationHeading = 'Conversation';
    $scope.isContactAvailable = false;
    $scope.isContactBlocked = false;

    // Fetch the current user.
    getCurrentUser.get()
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
          $scope.computeHeading(conversation.data);
          $scope.computeAvailability(conversation.data);
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
