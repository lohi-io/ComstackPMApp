var services = angular.module('ComstackPMApp.Services');
services.service('blockUserState', ['$state', '$modal', blockUserState]);

function blockUserState($state, $modal) {
  this.activate = function (templateUrl, okDestination, cancelDestination) {
    $modal.open({
      templateUrl: templateUrl,
      controller: 'BlockUserCtrl',
      backdrop: 'static',
      size: 'sm',
      windowClass: 'cs-pm-modal',
      backdropClass: 'cs-pm-modal-backdrop'
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
