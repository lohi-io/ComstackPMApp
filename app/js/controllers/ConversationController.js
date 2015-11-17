app.controller('ConversationCtrl', ['$scope', '$window', '$state', '$stateParams', '$filter', '$sce', 'getCurrentUser',
  'User', 'Conversation', 'configurationService', '$timeout', 'poller', '$anchorScroll', '$location', '$interval', '$log',
  function ($scope, $window, $state, $stateParams, $filter, $sce, getCurrentUser, User, Conversation, config, $timeout, poller, $anchorScroll, $location, $interval, $log) {

    $scope.isMobile = $window.isMobile.any;

    var settings = config.get();

    var markAsRead = function () {
      Conversation.markAsRead({id: $stateParams.id}, {}).$promise.then(function (response) {
      });
    };

    var messagesPoller;
    var availabilityPoller;

    var computeStrings = function () {
      $scope.text_read_only = config.getString('text__read_only', {base_url: settings.base_url,
        name: $scope.currentUser.user.name,
        user_id: $scope.currentUser.user.id
      });
      $scope.textMaxLength = settings.text__maxlength;
      $scope.allow_emoji = settings.allow_emoji;
      $scope.form_reply_submit = config.getString('form__reply__submit');
      $scope.link__delete = config.getString('link__delete');
      $scope.link__report = config.getString('link__report');
      $scope.link__block = config.getString('link__block');
      $scope.link__unblock = config.getString('link__unblock');
      $scope.heading__messages = config.getString('heading__messages');
      $scope.button__new_conversation = config.getString('button__new_conversation');
      $scope.button__load_older_messages = config.getString('button__load_older_messages');
      $scope.text__select_messages_to_delete = config.getString('text__select_messages_to_delete');
      $scope.form_reply_placeholder = config.getString('form__reply__placeholder');
      $scope.form_text_validation_maxlength = config.getString('form__text__validation__maxlength', {number: $scope.textMaxLength});
      $scope.form_text_validation_empty = config.getString('form__text__validation__empty');
      $scope.form_text_warning_emoji = config.getString('form__text__warning__emoji');
      $scope.text_forced_read_only = config.getString('text__forced_read_only');


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

      var contactId = 0;

      var contacts = $filter('filter')(conversation.participants, {id: '!' + $scope.currentUser.user.id});
      if (contacts.length == 0) {
        contacts = $filter('filter')(conversation.historical_participants, {id: '!' + $scope.currentUser.user.id});
        if (contacts.length != 0) {
          contactId = contacts[0].id;
        }
      } else {
        contactId = contacts[0].id;
      }

      if (contactId != 0) {


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
        availabilityPoller.promise.then(null, null, function (blockedUsers) {

          $scope.isContactBlocked = blockedUsers.data.length > 0 &&
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
      }
    };

    var greaterThan = function (attribute, value) {
      return function (item) {
        return item[attribute] > value;
      }
    };

    $scope.isLoading = false;
    $scope.paging = {};
    $scope.glued = true;
    $scope.messages = [];
    $scope.lastIndex = 0;
    $scope.paging = {};
    $scope.currentUser = {};
    $scope.reply = {
      text: ''
    };

    $scope.conversationHeading = 'Conversation';
    $scope.isContactAvailable = false;
    $scope.isContactBlocked = false;
    $scope.moreMessages = false;
    $scope.messagesPollDelay = config.getSetting(['poll_intervals', 'messages']) * 1000;
    $scope.availabilityDelay = config.getSetting(['poll_intervals', 'user_is_available']) * 1000;
    $scope.lastMessageId = 0;
    $scope.scrollPosition = 'bottom';
    $scope.eofDown = true;
    $scope.eofUp = false;


    $scope.fromNow = function(){
      $scope.messages.forEach(function(message){
        message.fromNow = $filter('dateFromNow')(message.sent);
      });
    };

    setInterval(function(){
      $scope.fromNow();
    }, 60000)

    $scope.onScrollUp = function () {
      if(!$scope.isMobile){
        $scope.scrollPosition = 'between';
        $scope.loadMessages('', $scope.messages[0].id);
      }else{
        //$scope.glue = false;
        $scope.scrollPosition = 'between';
      }
    }


    $scope.onScrollDown = function () {
      $scope.scrollPosition = 'bottom';
      markAsRead();
    }

    $scope.loadMessages = function (before, after, range, glue) {

      glue = glue || false;
      range = range || 10;
      $scope.isLoading = true;
      Conversation.getMessages({
        id: $stateParams.id,
        before: before,
        after: after,
        range: range
      }).$promise.then(function (messages) {
        if (messages.data.length < 10) {
          $scope.moreMessages = false;
        } else {
          if($scope.isMobile){
          Conversation.getMessages({
            id: $stateParams.id,
            before: before,
            after: messages.data[messages.data.length-1].id,
            range: range
          }).$promise.then(function(nextLoad){
            if (nextLoad.data.length > 0) {
              $scope.moreMessages = true;
            }else{
              $scope.moreMessages = false;
            }
          });
          }else{
            $scope.moreMessages = true;
          }
        }
        $scope.glued = glue;
        if (messages.data.length > 0) {
          var oldestMessageId = messages.data[0].id;
          messages.data[0].id > $scope.lastMessageId ? $scope.lastMessageId = messages.data[0].id : $scope.lastMessageId;
          config.setSettingValue('lastMessageId', $scope.lastMessageId);
          $scope.paging = messages.paging;
          for(var i = 0; i < messages.data.length; i++){
            $scope.messages.unshift(messages.data[i]);
          }
          $scope.fromNow();
          if($scope.isMobile){
            $location.hash(oldestMessageId);
            $anchorScroll();
          }
        }
        $scope.isLoading = false;

        if(!$scope.isMobile){

          if(after != ''){
            if (!$scope.moreMessages) {
              $scope.scrollPosition = 'top';
              $scope.eofUp = true;
            } else {
              $scope.eofUp = false;
            }
          }

        }
      });
    };


    $scope.unglue = function () {
      $scope.glued = false;
    };

    $scope.submitReply = function () {
      Conversation.reply({id: $stateParams.id}, $scope.reply).$promise.then(function (response) {
        $scope.glued = true;
        //config.setSettingValue('lastMessageId', response.data[0].id);
        //response.data[0].id > $scope.lastMessageId ? $scope.lastMessageId = response.data[0].id : $scope.lastMessageId;
        var results = $filter('filter')($scope.messages,{id: response.data[0].id});
        if(results.length == 0){
          response.data[0].fromNow = $filter('dateFromNow')(response.data[0].sent);
          $scope.messages.push(response.data[0]);
        }
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
          var otherParticipantsNames = Conversation.getOtherParticipantsNames(conversation.data, $scope.currentUser);
          $scope.conversationHeading = config.getString('heading__conversation_with', {
            participants: otherParticipantsNames
          });
          computeAvailability(conversation.data);
          if($scope.isMobile){
            $scope.loadMessages('', '', 10, true);
          }
          else {
            $scope.loadMessages('', '', 20, true);
          }

          // Confirm that conversation report action was successful.
          if ($stateParams.reported) {
            $scope.reportedConversation = config.getString('text__report_success', {participants: otherParticipantsNames});
          }
        });
      });

    $scope.$watch('lastMessageId', function(newValue, oldValue) {

      if(newValue !== 0 && oldValue === 0){
        $log.debug('set the poller');

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
          $log.debug('messages poll try');
          if (data.data.length == 0) {
            $scope.glued = false;
          }

          if (data.data.length > 0) {
            results.push.apply(results, data.data);
            results = $filter('filter')(results, greaterThan('id', $scope.lastMessageId), true);
            results = $filter('orderBy')(results, 'id');
            if (results.length > 0) {
              var toBeRemoved = $filter('filter')($scope.messages, greaterThan('id', $scope.lastMessageId), true);
              $scope.messages.splice(-toBeRemoved.length, toBeRemoved.length);
              $scope.messages.push.apply($scope.messages, results);
              $scope.fromNow();
              if ($scope.scrollPosition == 'bottom') {
                markAsRead();
                $scope.glued = true;
              }
              $timeout(function () {
                $scope.glued = false;
              });
            }
            data.data[0].id > $scope.lastMessageId ? $scope.lastMessageId = data.data[0].id : $scope.lastMessageId;
            config.setSettingValue('lastMessageId', $scope.lastMessageId);
            $log.debug('messages poll done');
          };
        });

      } else {
        return;
      }
    });


  }
]);
