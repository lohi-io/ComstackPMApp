var services = angular.module('ComstackPMApp.Services');
services.service('reportConversationState', ['$state', '$modal', reportConversationState]);

function reportConversationState($state, $modal) {
  this.activate = function (templateUrl, okDestination, cancelDestination) {
    $modal.open({
      templateUrl: templateUrl,
      controller: 'ReportConversationCtrl',
      backdrop: 'static',
      size: 'md'
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
