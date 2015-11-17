app.controller('MessageCtrl', ['$scope', '$state', 'getAvailableUsers',
              'configurationService', 'Conversation', 'getCurrentUser', '$stateParams', '$filter', '$log', '$window',
  function ($scope, $state, getAvailableUsers, config, Conversation, userService, $stateParams, $filter, $log, $window) {

    var settings = config.get();
    $scope.requiredUsers = $stateParams.userId;
    $scope.currentUser = {};
    $scope.maxTags = settings.max_participants - 1;
    $scope.isContactsAvailable = true;

    getAvailableUsers.get().then(function(availableUsers) {
      $scope.isContactsAvailable = availableUsers.data.length > 0;
      if($scope.requiredUsers){
         var requiredUsers = $scope.requiredUsers.split(',');
         var allowed = $scope.maxTags <  requiredUsers.length ? $scope.maxTags : requiredUsers.length;
         for(var i = 0; i < allowed; i++){
           var userAvailable = $filter('filter')(availableUsers.data, {id: requiredUsers[i]});
           if(userAvailable.length > 0){
             $scope.users.push(userAvailable[0]);
           };
         };
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
    }

  }
]);
