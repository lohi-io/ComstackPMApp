/**
 * Created by fechit01 on 05/10/2015.
 */
app.controller('ErrorCtrl', [
  '$scope', '$modalInstance', 'configurationService', 'error',
  function ($scope, $modalInstance, config, error) {

    $scope.showErrorDetails = false;
    $scope.error = error;
    $scope.errorMessage = "";
    $scope.modal_error_heading = config.getString('modal__error__heading');
    $scope.button_ok = config.getString('button__ok');

    if($scope.error.status == null || $scope.error.data == null || $scope.error.status === 0 || $scope.error.status === -1){
      config.setSettingValue('http_error', true);
      $scope.errorMessage = config.getString('error__no_connection');
    }else{
      if($scope.error.data.status == 500){
        config.setSettingValue('http_error', true);
      }
      $scope.errorMessage = config.getString('error__api_bad_response');
      $scope.errorDetails = config.getString('error__details', {status: $scope.error.data.status, error: $scope.error.data.title});
      $scope.error_hide_text = config.getString('error__hide_text');
      $scope.error_show_text = config.getString('error__show_text');
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
