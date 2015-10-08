app.controller('BlockUserCtrl', [
  '$scope', '$modalInstance', '$stateParams', 'configurationService', 'Conversation', 'getCurrentUser', '$filter', 'User',
  function ($scope, $modalInstance, $stateParams, config, Conversation, userService, $filter, User) {

    var computeUsers = function (conversation) {
      if (angular.isUndefined($scope.currentUser.user)) {
        return [];
      }
      conversation.participants.forEach(function(user){
        $scope.users.push(user);
      })

      if ( $scope.users.length === 0) {
        conversation.historical_participants.forEach(function(user){
          $scope.users.push(user);
        })
      }
      $scope.users = $filter('filter')($scope.users, {id: '!' + $scope.currentUser.user.id});

      $scope.users.forEach(function(user){
        user.isSelected = false;
      });

    };


    $scope.currentUser = {};
    $scope.users = [];
    $scope.modal_block_heading = config.getString('modal__block__heading');
    $scope.button_ok = config.getString('button__ok');
    $scope.button_cancel = config.getString('button__cancel');


    userService.get()
      .then(function (data) {
        $scope.currentUser = data.data;
        Conversation.get({
          id: $stateParams.id,
          access_token: config.getSetting('access_token')
        }).$promise.then(function (conversation) {
           computeUsers(conversation.data);
          if(!$scope.currentUser.permissions.users.block){
            $scope.modal_block_text = config.getString('modal__block__not__allowed__text');
          }else{
            if($scope.users.length == 1){
              $scope.modal_block_text = config.getString('modal__block__text', {name: $scope.users[0].name});
              $scope.users[0].isSelected = true;
            }else{
              $scope.modal_block_text = config.getString('modal__block__text__multiple');
            }
          };

        });
      });

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.confirm = function () {
      $scope.users.forEach(function(user){
        if(user.isSelected){
          User.block({user: user.id}, function () {
            user.isBlocked = true;
          },
            function (error) {
              //error handling;
              console.log(error);
            });
        }
      });
      var blockedUsers = $filter('filter')($scope.users, {isBlocked: true});
      var selectedUsers = $filter('filter')($scope.users, {isSelected: true});
      if(blockedUsers.length == selectedUsers.length){
        $modalInstance.close(true);
      }
    };
  }
]);
