/**
 * Created by fechit01 on 05/10/2015.
 */
app.controller('DeleteConversationCtrl', [
  '$scope', '$modalInstance', 'Conversation', '$stateParams', 'configurationService',
  function ($scope, $modalInstance, Conversation, $stateParams, config) {

    $scope.modal_delete_conversation__heading = config.getString('modal__delete_conversation__heading');
    $scope.modal_delete_conversation_text = config.getString('modal__delete_conversation__text');


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.confirm = function () {
      Conversation.get({
        id: $stateParams.id,
        access_token: config.getSetting('access_token')
      }).$promise.then(function (conversation) {
        conversation.$delete({id: conversation.data.id}, function () {
            Conversation.get({
              page: $stateParams.page,
              access_token: config.getSetting('access_token')
            }).$promise.then(function(conversations){
                var params = {};
                if(conversations.data.length == 0){
                   if($stateParams.page > 1) {
                     params.page = $stateParams.page - 1;
                   }else{
                     params.page = 1
                   }
                }
                params.result = true;
                $modalInstance.close(params);
            })



        },
          function (error) {
            //error handling;
            console.log(error);
          })
      });

    };
  }
]);
