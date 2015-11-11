app.controller('InboxCtrl', ['$scope', '$window', '$state', '$stateParams', 'getCurrentUser', 'Conversation',
  'configurationService', '$filter', 'poller', '$timeout',
  function ($scope, $window, $state, $stateParams, userService, Conversation, config, $filter, poller, $timeout) {

    var settings = config.get();

    var calculatePages = function () {
      $scope.paging.pagesCount = $window.Math.ceil($scope.paging.total / $scope.paging.range);

      for (var i = 0; i < $scope.paging.pagesCount; i++) {
        $scope.pages[i] = {
          number: i + 1,
          url: '#/inbox/' + (i+1)
        };
      }
    };

    var computeStrings = function (){
      $scope.text_heading_messages = config.getString('heading__messages');
      $scope.text_last_message = config.getString('text__last_message');
      $scope.text_read_only = config.getString('text__read_only', {base_url: settings.base_url,
        name: $scope.currentUser.user.name,
        user_id: $scope.currentUser.user.id
      });
      $scope.text_link_delete = config.getString('link__delete');
      $scope.text_link_report = config.getString('link__report');
      $scope.button_new_conversation = config.getString('button__new_conversation');
      $scope.text_no_conversations = config.getString('text__no_conversations', {base_url: settings.base_url,
        user_id: $scope.currentUser.user.id
      });
      $scope.button_friends_list = config.getString('button__friends_list');
      $scope.friends_link = settings.base_url + '/friends/' + $scope.currentUser.user.id;
    };

    $scope.goToPage = function (page) {
      $state.go('inbox', {
        page: page
      });
    };

    $scope.previous = function () {
      if (angular.isDefined($scope.paging.previous)) {
        $scope.goToPage($scope.paging.current_page - 1);
      }
    };

    $scope.next = function () {
      if (angular.isDefined($scope.paging.next)) {
        $scope.goToPage($scope.paging.current_page + 1);
      }
    };

    $scope.fromNow = function(date){
      return moment(date).fromNow();
    };

    $scope.formatDate = function(date){
      return moment(date).format('hh:mm MMMM Do, YYYY');
    };

    /**
     * Computes the heading of a given conversation.
     *
     * A conversation heading consists of a list of participants excluding the current user.
     * If a conversation's list of participants is empty aside from the current user,
     * historical participants will be used.
     * @param conversation
     * @returns {string}
     *  Conversation heading as defined above. Example formatting: "B, C and D", where the current user is A
     *  and the conversation participants are A, B, C and D.
     */
    $scope.computeHeading = function(conversation) {
      // The return of this function is used in template bindings so
      // we should make sure this doesn't error out if the current user hasn't been determined.
      if (angular.isUndefined($scope.currentUser.user)) {
        return '';
      }

      // Find the participants of the conversation, excluding the current user.
      // If there are no other participants, check historical participants instead.
      var otherParticipants = $filter('filter')(conversation.participants, {
        id: '!' + $scope.currentUser.user.id
      });

      if (otherParticipants.length === 0) {
        otherParticipants = $filter('filter')(conversation.historical_participants, {
          id: '!' + $scope.currentUser.user.id
        });
      }

      var otherParticipantNames = '';

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

      return otherParticipantNames;
    };

    /**
     * Computes the avatar which represents a conversation.
     *
     * The avatar which represents a conversation depends on whether the conversation is between two people
     * or more than two. For the case where the conversation is between two people, the avatar will be the chosen
     * from the user who is not the current user.
     *
     * Currently, this app does not fully support more than two people in a conversation, so the avatar will be chosen
     * from the first user excluding the current user.
     * @param conversation
     *   The conversation model to avatarise.
     * @param imageStyle
     *   The style of avatar requested.
     *
     * @return {string}
     *   The URL of the avatar that represents conversation.
     */
    $scope.computeAvatar = function(conversation, imageStyle) {
      if (angular.isUndefined($scope.currentUser.user)) {
        return ''; // @TODO: This should preferably return a default avatar delivered by the API.
      }

      // Find the participants of the conversation, excluding the current user.
      var otherParticipants = $filter('filter')(conversation.participants, {
        id: '!' + $scope.currentUser.user.id
      });

      // If there are no other participants, check historical participants instead.
      if (otherParticipants.length === 0) {
        otherParticipants = $filter('filter')(conversation.historical_participants, {
          id: '!' + $scope.currentUser.user.id
        });
      }

      // If there are still no other participants, give up.
      if (otherParticipants.length === 0) {
        return ''; // @TODO: This should preferably return a default avatar delivered by the API.
      }

      var avatarUser = otherParticipants[0];

      if (avatarUser.avatars[imageStyle]) {
        return avatarUser.avatars[imageStyle];
      } else {
        var avatarStyles = Object.keys(avatarUser.avatars);
        return avatarUser.avatars[avatarStyles[0]];
      }
    };

    $scope.conversations = [];
    $scope.paging = {};
    $scope.currentUser = {};
    $scope.conversationsPollDelay = config.getSetting(['poll_intervals', 'conversations']) * 1000;
    $scope.isLoading = true;

    userService.get().then(function (data) {
      $scope.currentUser = data.data;
      computeStrings();
    });

    var ConversationsPoller = poller.get(Conversation, {
      action: 'get',
      argumentsArray: [{
        page: $stateParams.page
      }],
      delay: $scope.conversationsPollDelay
    });

    ConversationsPoller.promise.then(null, null, function (data) {
      // Reduce DOM thrashing
      if (!angular.equals($scope.conversations, data.data)) {
        $scope.conversations = data.data;
      }
      $scope.paging = data.paging;
      calculatePages();
      $scope.isLoading = false;


      if ($scope.currentUser.preferences.read_only_mode) {
        ConversationsPoller.stop();
      }
    });

    if ($stateParams.reported) {
      Conversation.get({
        id: $stateParams.reported
      }).$promise.then(function(response) {
        if (response.data) {
          var participants = $scope.computeHeading(response.data);
          $scope.reportedConversation = config.getString('text__report_success', {
            participants: participants
          });
        }
      });
    }

    $scope.paging.pagesCount = 0;
    $scope.pages = [];
  }
]);
