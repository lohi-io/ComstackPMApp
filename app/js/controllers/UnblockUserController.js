app.controller('UnblockUserCtrl', [
  '$scope', '$modalInstance', '$stateParams', 'configurationService', 'Conversation', 'getCurrentUser', '$filter', 'User',
  function ($scope, $modalInstance, $stateParams, config, Conversation, userService, $filter, User) {

    var computeUsers = function (conversation) {
      var users = [];
      if (angular.isUndefined($scope.currentUser.user)) {
        return [];
      }
      conversation.participants.forEach(function(user){
        users.push(user);
      })

      if (users.length === 0) {
        conversation.historical_participants.forEach(function(user){
          users.push(user);
        })
      }
      users = $filter('filter')(users, {id: '!' + $scope.currentUser.user.id});

      users.forEach(function(user){
        User.getBlockedUsers({
          'filter[user]': user.id,
          access_token: config.getSetting('access_token')
        }).$promise.then(function(blockedUsers){
           if(blockedUsers.data.length > 0){
             $scope.blockedUsers.push(blockedUsers.data[0].user);
             $scope.relations[blockedUsers.data[0].user.id] = blockedUsers.data[0].id;

             if(!$scope.currentUser.permissions.users.block){
               $scope.modal_unblock_text = config.getString('modal__unblock__text__not_allowed');
             }else{
               if($scope.blockedUsers.length == 1){
                 $scope.modal_unblock_text = config.getString('modal__unblock__text', {name: $scope.blockedUsers[0].name});
                 $scope.blockedUsers[0].isSelected = true;
               }else{
                 $scope.modal_unblock_text = config.getString('modal__unblock__text__multiple');
               }
             };
           }
        });


      });
    };


    $scope.currentUser = {};
    $scope.blockedUsers = [];
    $scope.relations = [];
    $scope.modal_unblock_heading = config.getString('modal__unblock__heading');
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
        });
      });

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.confirm = function () {
      angular.forEach($scope.blockedUsers, function(user, key) {
        if (user.isSelected) {
          User.unblock({id: $scope.relations[user.id]}, function () {
            user.isUnblocked = true;
          }, function (error) {
            console.log(error);
          }).$promise.then(function() {
            if (key === $scope.blockedUsers.length - 1) {
              $modalInstance.close(true);
            }
          });
        }
      });
    };
  }
]);
