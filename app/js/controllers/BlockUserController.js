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

      $scope.users = $filter('filter')($scope.users, {id: '!' + $scope.currentUser.user.id});

      if ($scope.users.length === 0) {
        conversation.historical_participants.forEach(function(user){
          $scope.users.push(user);
        })
      }

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
            $scope.modal_block_text = config.getString('modal__block__text__not_allowed');
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
      angular.forEach($scope.users, function(user, key) {
        if (user.isSelected) {
          User.block({user: user.id}, function () {
            user.isBlocked = true;
          }, function (error) {
            console.log(error);
          }).$promise.then(function() {
            if (key === $scope.users.length - 1) {
              $modalInstance.close(true);
            }
          });
        }
      });
    };
  }
]);
