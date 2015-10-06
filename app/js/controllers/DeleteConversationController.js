/**
 * Created by fechit01 on 05/10/2015.
 */
app.controller('DeleteConversationCtrl', [
  '$scope', '$modalInstance', 'Conversation', '$stateParams', 'configurationService',
  function ($scope, $modalInstance, Conversation, $stateParams, config) {

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.confirm = function () {
      Conversation.get({
        id: $stateParams.id,
        access_token: config.getSetting('access_token')
      }).$promise.then(function (conversation) {
        conversation.$delete({id: conversation.data.id}, function () {
          $modalInstance.close(true);
        },
          function (error) {
            //error handling;
            console.log(error);
          })
      });

    };
  }
]);
