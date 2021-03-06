/**
 * Created by fechit01 on 11/09/2015.
 */
app.controller('HomeCtrl', ['$scope', 'Authentication', '$timeout', '$state', '$location', 'configurationService',
  function ($scope, Authentication, $timeout, $state, $location, config) {
    $scope.isAuthenticated = false;
    $scope.message = "";

    $scope.loginData = {
      username: 'basic_user_1',
      password: 'password'
    };

    $scope.login = function(){
      var localHost = $location.host();
      var settings = config.get();
      if (localHost == settings.local_host && settings.access_token == "") {
        Authentication.apiLogin($scope.loginData.username, $scope.loginData.password).then(function () {
          console.log("Login done")
          $scope.isAuthenticated = true;
          $scope.message = "Login done";
          $state.go('inbox', {page: 1});
        }, function (error) {
          console.log(error);
        })
      }else{
        $state.go('inbox', {page: 1});
      }
    }


  }
]);
