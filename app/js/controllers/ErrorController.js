/**
 * Created by fechit01 on 05/10/2015.
 */
app.controller('ErrorCtrl', [
  '$scope', '$modalInstance', 'configurationService', 'error',
  function ($scope, $modalInstance, config, error) {

    $scope.error = error;
    $scope.modal_error_heading = config.getString('modal__error__heading');
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
