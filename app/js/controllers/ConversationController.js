app.controller('ConversationCtrl', ['$scope', '$window', '$state', '$stateParams', '$filter', '$sce', 'getCurrentUser',
  'User', 'Conversation', 'configurationService', '$timeout', 'poller',
  function ($scope, $window, $state, $stateParams, $filter, $sce, getCurrentUser, User, Conversation, config, $timeout, poller) {

    var settings = config.get();

    var markAsRead = function(){
      Conversation.markAsRead({id: $stateParams.id}, {}).$promise.then(function (response) {

      });
    };

    var messagesPoller;
    var availabilityPoller;

    var afterLoad = function (messages, glue, index) {
      var results = [];
      $scope.glued = glue;
      if (messages.data.length > 0) {
        messages.data[0].id > $scope.lastMessageId ? $scope.lastMessageId = messages.data[0].id : $scope.lastMessageId;
        config.setSettingValue('lastMessageId', $scope.lastMessageId);
        $scope.paging = messages.paging;
        results.push.apply(results, messages.data);
        results = $filter('orderBy')(results, 'id');
        if (results.length < 10) {
          $scope.moreMessages = false;
        } else {
          $scope.moreMessages = true;
        }
      }
      return results;
    };

    var computeHeading = function (conversation) {
      // use historical participants if participants array is empty
      var otherParticipants = conversation.participants;
      var otherParticipantNames = '';
      if (otherParticipants.length === 0) {
        otherParticipants = conversation.historical_participants;
      }

      // exclude current user from heading title
      otherParticipants = $filter('filter')(otherParticipants, {id: '!' + $scope.currentUser.user.id});

      angular.forEach(otherParticipants, function (participant, key) {
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

      $scope.conversationHeading = config.getString('heading__conversation_with', {participants: otherParticipantNames});
    };

    var computeStrings = function () {
      $scope.text_read_only = config.getString('text__read_only', {
        name: $scope.currentUser.user.name,
        user_id: $scope.currentUser.user.id
      });
      $scope.textMaxLength = settings.message_maxlength;
      $scope.allow_emoji = settings.allow_emoji;
      $scope.form_reply_submit = config.getString('form__reply__submit');
      $scope.link__delete = config.getString('link__delete');
      $scope.link__report = config.getString('link__report');
      $scope.link__block = config.getString('link__block');
      $scope.heading__messages = config.getString('heading__messages');
      $scope.button__new_conversation = config.getString('button__new_conversation');
      $scope.button__load_older_messages = config.getString('button__load_older_messages');
      $scope.text__select_messages_to_delete = config.getString('text__select_messages_to_delete');
      $scope.form_reply_placeholder = config.getString('form__reply__placeholder');
      $scope.form_text_validation_maxlength = config.getString('form__text__validation__maxlength', {number: $scope.textMaxLength});
      $scope.form_text_validation_empty = config.getString('form__text__validation__empty');
      $scope.form_text_warning_emoji = config.getString('form__text__warning__emoji');
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
    var computeAvailability = function (conversation) {
      if (angular.isUndefined($scope.currentUser.user)) {
        $scope.isContactAvailable = false;
        $scope.isContactBlocked = false;
        return;
      }

      var contacts = $filter('filter')(conversation.participants, {id: '!' + $scope.currentUser.user.id});
      var contactId = contacts[0].id;

      // Check if current user has blocked contact every `availabilityDelay` milliseconds.
      availabilityPoller = poller.get(User, {
        action: 'getBlockedUsers',
        argumentsArray: [{
          'filter[user]': contactId
        }],
        delay: $scope.availabilityDelay,
        smart: true
      });

      // After checking is contact is blocked, determine if they are available.
      availabilityPoller.promise.then(null, null, function(blockedUsers) {
        $scope.isContactBlocked = blockedUsers.hasOwnProperty('data') &&
          $filter('filter')(blockedUsers.data, {user: {id: contactId}}).length === 1;

        // If contact is blocked, we won't be able to check if they are available, so assume they are not.
        if ($scope.isContactBlocked) {
          $scope.isContactAvailable = false;
          return;
        }

        User.getAvailableUsers({
          'filter[id]': contactId
        }).$promise.then(function (availableUsers) {
          // Check the response data only contains the contact's id.
          $scope.isContactAvailable = availableUsers.hasOwnProperty('data') &&
            $filter('filter')(availableUsers.data, {id: contactId}).length === 1;
        });
      });
      //User.getBlockedUsers({
      //  'filter[user]': contactId
      //}).$promise.then(function (blockedUsers) {
      //  $scope.isContactBlocked = blockedUsers.hasOwnProperty('data') &&
      //    $filter('filter')(blockedUsers.data, {user: {id: contactId}}).length === 1;
      //
      //  // If contact is blocked, we won't be able to check if they are available, so assume they are not.
      //  if ($scope.isContactBlocked) {
      //    $scope.isContactAvailable = false;
      //    return;
      //  }
      //
      //  User.getAvailableUsers({
      //    'filter[id]': contactId
      //  }).$promise.then(function (response) {
      //    // Check the response data only contains the contact's id.
      //    $scope.isContactAvailable = response.hasOwnProperty('data') &&
      //      $filter('filter')(response.data, {id: contactId}).length === 1;
      //  });
      //});
    };

    var greaterThan = function (attribute, value) {
      return function (item) {
        return item[attribute] > value;
      }
    };
    /**
     * Determines the conversation heading used for this conversation.
     * @param conversation
     *   See Comstack API Conversation model.
     */
    $scope.paging = {};
    $scope.glued = true;
    $scope.messages = [];
    $scope.lastIndex = 0;
    $scope.scrollCalls = 0;
    $scope.paging = {};
    $scope.currentUser = {};
    $scope.reply = {
      text: ''
    };
    $scope.conversationHeading = 'Conversation';
    $scope.isContactAvailable = false;
    $scope.isContactBlocked = false;
    $scope.scrollAdapter = {};
    $scope.moreMessages = false;
    $scope.messagesPollDelay = config.getSetting(['poll_intervals', 'messages']) * 1000;
    $scope.availabilityDelay = config.getSetting(['poll_intervals', 'user_is_available']) * 1000;
    $scope.lastMessageId = 0;
    $scope.scrollPosition = 'bottom';


    $scope.messagesDatasource = {
      get: function (index, count, success) {
        var after = "";
        var before = "";
        var afterFix = "";
        var beforeFix = "";


        if ($scope.scrollCalls < 3) {
          if (index == 1) {
            $scope.scrollCalls++;
            $timeout(function () {
              Conversation.getMessages({
                id: $stateParams.id,
                before: '',
                after: ''
              }).$promise.then(function (messages) {
                success(afterLoad(messages, true, index));
                markAsRead();
              });
            });
          }

          if (index == 1 - count) {
            $scope.scrollCalls++;
            Conversation.getMessages({
              id: $stateParams.id,
              after: $scope.paging.cursors.after,
              before: ''
            }).$promise.then(function (messages) {
              success(afterLoad(messages, false, index));
              $scope.scrollPosition = 'between';
            });
          }

          if (index == count + 1) {
            $scope.scrollCalls++;
            $timeout(function () {
              success([]);
            });
          }
        }

        else {
          if (($scope.paging.next !== null || $scope.paging.previous !== null)) {
            $scope.scrollCalls++;
            if (!angular.isUndefined($scope.paging.next)) {
              after = $scope.paging.cursors.after;
            }

            if (!angular.isUndefined($scope.paging.previous)) {
              before = $scope.paging.cursors.before;
            }

            //this needs to be changed after the api is fixed
            beforeFix = before;
            afterFix = after;
            if (index > $scope.lastIndex) {//down
              afterFix = '';
            } else {
              beforeFix = '';
            }


            $scope.lastIndex = index;
            $timeout(function () {
              Conversation.getMessages({
                id: $stateParams.id,
                before: beforeFix,
                after: afterFix
              }).$promise.then(function (messages) {
                 if(messages.data.length < 10 ){
                   markAsRead();
                   if (index >= $scope.lastIndex) {//down
                     $scope.scrollPosition = 'bottom';
                   }else{
                     $scope.scrollPosition = 'top';
                   }
                 }else{
                   $scope.scrollPosition = 'between';
                 }
                 success(afterLoad(messages, false, index));
              });
            });
          } else {
            success([]);
          }
        }
      }
    };

    $scope.unglue = function () {
      $scope.glued = false;
    };

    $scope.loadMore = function () {
      if ($scope.paging.next !== null) {
        Conversation.getMessages({
          id: $stateParams.id,
          before: $scope.paging.cursors.before,
          after: ''
        }).$promise.then(function (messages) {
          $scope.glued = false;
          $scope.messages.push.apply($scope.messages, messages.data);
          $scope.paging = messages.paging;
        });
      }
    };

    $scope.goToInbox = function () {
      $state.go('inbox', {
        page: 1
      }, {
        reload: 'inbox'
      });
    };

    $scope.submitReply = function () {
      Conversation.reply({id: $stateParams.id}, $scope.reply).$promise.then(function (response) {
        $scope.glued = true;
        $scope.scrollAdapter.append([response.data[0]]);
        $scope.reply.text = '';
        $scope.newMessageForm.$setPristine();
        $timeout(function () {
          $scope.glued = false;
        });
      });
    };

    // Fetch the current user.
    getCurrentUser.get()
      .then(function (data) {
        $scope.currentUser = data.data;
        computeStrings();

        // Load the messages within the current conversation.
        // This needs to happen after we get the current user
        // as we need to know the current user as well as the other
        // participants to calculate the heading.
        Conversation.get({
          id: $stateParams.id,
          access_token: settings.access_token
        }).$promise.then(function (conversation) {
          markAsRead();
          computeHeading(conversation.data);
          computeAvailability(conversation.data);


        });
      });

    messagesPoller = poller.get(Conversation, {
      action: 'getMessages',
      argumentsArray: [{
        id: $stateParams.id,
        range: 50,
        poll: true
      }],
      delay: $scope.messagesPollDelay,
      smart: true
    });

    messagesPoller.promise.then(null, null, function (data) {
      // Reduce DOM thrashing
      var results = [];
      console.log('messages poll try');

      if($scope.scrollCalls >=3 &&  data.data.length > 0){
        results.push.apply(results, data.data);
        results = $filter('filter')(results, greaterThan('id', $scope.lastMessageId), true);
        results = $filter('orderBy')(results, 'id');
        if(results.length > 0){
          $scope.scrollAdapter.append(results);
          if($scope.scrollPosition == 'bottom'){
            $scope.glued = true;
          }
          console.log($scope.scrollPosition);
          $timeout(function () {
            $scope.glued = false;
          });
        }
        data.data[0].id > $scope.lastMessageId ? $scope.lastMessageId = data.data[0].id : $scope.lastMessageId;
        config.setSettingValue('lastMessageId', $scope.lastMessageId);
        console.log('messages poll done');
        console.log(results);
     };

      if (angular.isUndefined($scope.currentUser.user) && $scope.currentUser.preferences.read_only_mode) {
        messagesPoller.stop();
      }
    });

  }
]);
