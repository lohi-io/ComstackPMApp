var services = angular.module('ComstackPMApp.Services');
services.service('reportConversationState', ['$state', '$modal', reportConversationState]);

function reportConversationState($state, $modal) {
  this.activate = function (templateUrl, okDestination, cancelDestination) {
    $modal.open({
      templateUrl: templateUrl,
      controller: 'ReportConversationCtrl',
      backdrop: 'static',
      size: 'md',
      windowClass: 'cs-pm-modal',
      backdropClass: 'cs-pm-modal-backdrop'
    }).result.then(function (result) {
      if (result === true) {
        var successParams = okDestination.params;
        if (okDestination.state === 'inbox') {
          successParams.reported = okDestination.params.id;
        } else if (okDestination.state === 'conversation') {
          successParams.reported = true;
        }
        $state.go(okDestination.state,
          successParams,
          {
            reload: true,
            inherit: false,
            notify: true
          });
      }
    }, function () {
      $state.go(cancelDestination.state, cancelDestination.params);
    });
  }
}
