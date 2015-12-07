app.controller('MessageCtrl', ['$scope', '$state', 'getAvailableUsers',
              'configurationService', 'Conversation', 'getCurrentUser', '$stateParams', '$filter', '$log', '$window',
  function ($scope, $state, getAvailableUsers, config, Conversation, userService, $stateParams, $filter, $log, $window) {

    var settings = config.get();
    $scope.requiredUsers = $stateParams.userId;
    $scope.currentUser = {};
    $scope.maxTags = settings.max_participants - 1;
    $scope.isContactsAvailable = true;

    var requiredUsers = $scope.requiredUsers.split(',');
    var allowed = $scope.maxTags < requiredUsers.length ? $scope.maxTags : requiredUsers.length;

    if (allowed === 1 && requiredUsers.length > 0) {
      $scope.isLoading = true;
    }
    // On initialisation, fetch available users and prepare to send messages to any user IDs in the URL.
    getAvailableUsers.get().then(function(availableUsers) {
      $scope.isContactsAvailable = availableUsers.data.length > 0;
      if ($scope.requiredUsers) {

        if (allowed > 1) {
          // If sending message to more than one person, pre-populate the To field with their names.
          for (var i = 0; i < allowed; i++) {
            var userAvailable = $filter('filter')(availableUsers.data, {id: requiredUsers[i]});
            if (userAvailable.length > 0) {
              $scope.users.push(userAvailable[0]);
            }
          }
        } else {
          // If sending a message to just one person, see if we can redirect to an existing conversation.
          $scope.prepareMessageForContact($filter('filter')(availableUsers.data, {id: requiredUsers[0]})[0]);
        }
      }
    });

    $scope.cancelString = config.getString('button__cancel');
    $scope.text_friends_link = config.getString('link__no_available_users');
    $scope.text_no_friends = config.getString('text__no_conversations_no_friends');

    userService.get().then(function (data) {
      $scope.currentUser = data.data;
      $scope.new_conversation_header = config.getString('form__new_conversation__header', {base_url: settings.base_url,
        user_id: $scope.currentUser.user.id
      });
      $scope.friends_link = settings.base_url + '/friends/' + $scope.currentUser.user.id;
    });

    $scope.allow_emoji = settings.allow_emoji;

    var numberLabel = '';
    $scope.textMaxLength = settings.text__maxlength;
    $scope.form_to_label = config.getString('form__to__label');

    if( $scope.maxTags == 1){
      $scope.form_to_placeholder = config.getString('form__to__placeholder__singular');
      numberLabel = '1 person'
    }else{
      $scope.form_to_placeholder = config.getString('form__to__placeholder__plural');
      numberLabel = '2 people'
    };

    $scope.form_to_validation_empty = config.getString('form__to__validation__empty');
    $scope.form_to_validation_limit_exceeded = config.getString('form__to__validation__limit_exceeded', {number_label: numberLabel});
    $scope.form_text_placeholder = config.getString('form__text__placeholder');
    $scope.form_text_validation_empty = config.getString('form__text__validation__empty');
    $scope.form_text_validation_maxlength = config.getString('form__text__validation__maxlength', {number: $scope.textMaxLength});
    $scope.form_new_conversation_submit = config.getString('form__new_conversation__submit');
    $scope.form_text_warning_emoji = config.getString('form__text__warning__emoji');

    $scope.message = new Conversation({
      recipients: [],
      text: ""
    });

    $scope.newMessageForm = {};
    $scope.users = [];

    $scope.checkEmptyTag = function(tag){
      return tag.id != 0
    }

    $scope.cancel = function(){
      if($scope.requiredUsers){
        $window.location.href = settings.base_url + '/friends/' + $scope.currentUser.user.id;
      }else{
        $state.go('inbox', {page: 1},
          {
            reload: 'conversation',
            inherit: false,
            notify: true
          });
      }
    }

    $scope.getAvailableUsers = function (search) {
      $scope.noResults = "";
      return getAvailableUsers.get(search).then(function (response) {
        if (response.data.length == 0) {
          $scope.noResults = "No users found"
          return [{id:0,
                   name: 'not found',
            avatars:{'200-200':''} }];
        }
          return response.data.map(function (item) {
            return item;
          });
      });
    };

    $scope.safeText = "";
    $scope.preventUndefined = function(){

    }


    $scope.save = function () {

      $scope.message.recipients = $scope.users.map(function (item) {
        return item.id
      });

      $scope.message.$save(function (response) {
        $state.go('conversation', {id: response.data.id},
          {
          reload: 'conversation',
          inherit: false,
          notify: true
        });
      },
        function (error) {
          //error handling;
          $log.error(error);
        });
    };
    /**
     * Prepares app state such that the user can send a message to a given contact.
     *
     * This method checks for the existence of a conversation between the current user
     * and the contact. If one exists, the app enters this Conversation state (with the
     * conversation ID of the pre-existing conversation). Otherwise, the user is pre-populated
     * into scope.users
     * @param {user} contact
     * @return void
     */
    $scope.prepareMessageForContact = function(contact) {
      Conversation.get({
        'filter[participants]': contact.id
      }).$promise.then(function(response) {
        if (response.data.length) {
          // There is a conversation with this contact - use the first response.
          // There should only be one, but the API will return an array since it's really a filtered data set.
          $state.go('conversation', {id: response.data[0].id});
        } else {
          $scope.isLoading = false;
          // Use existing functionality to pre-populate scope.users variable.
          $scope.users.push(contact);
        }
      });
    };

  }
]);
