app.controller('MessageCtrl', ['$scope', '$state', 'getAvailableUsers', 'configurationService', 'Conversation', '$http', '$q',
  function ($scope, $state, getAvailableUsers, config, Conversation, $http, $q) {

    $scope.message = new Conversation({
      recipients: [],
      text: ""
    });

    $scope.users = [];

    $scope.getAvailableUsers = function (search) {
      return getAvailableUsers.get(search).then(function (response) {
        return response.data.map(function (item) {
          return item;
        });
      });
    };

    $scope.new_conversation_header = config.getString('form__new_conversation__header', {user_id: ''});

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
          console.log(error);
        });
    }

  }
]);
