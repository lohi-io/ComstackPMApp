var services = angular.module('ComstackPMApp.Services');
services.service('deleteConversationState', ['$state', '$modal', deleteConversationState]);

function deleteConversationState($state, $modal) {
  this.activate = function (templateUrl, okDestination, cancelDestination) {
    $modal.open({
      templateUrl: templateUrl,
      controller: 'DeleteConversationCtrl',
      backdrop: 'static',
      size: 'sm'
    }).result.then(function (result) {
      if (result === true) {
        $state.go(okDestination.state,
          okDestination.params,
          {
            reload: okDestination.state,
            inherit: false,
            notify: true
          });
      }
    }, function () {
      $state.go(cancelDestination.state, cancelDestination.params);
    });
  }
}
