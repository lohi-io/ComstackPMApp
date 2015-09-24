/**
 * Created by fechit01 on 11/09/2015.
 */
app.controller('HomeCtrl', ['$scope', 'Authentication', '$timeout', '$state', '$location', 'ConfigurationService',
  function ($scope, Authentication, $timeout, $state, $location, config) {
    $scope.isAuthenticated = false;

    var localHost = $location.host();
    var settings = config.get();
    if (localHost == settings.local_host && settings.access_token == "") {
      Authentication.apiLogin().then(function () {
        console.log("Login done")
        $scope.isAuthenticated = true;
        $state.go('inbox', {page: 1});
      }, function (error) {
        console.error(error);
      })
    }else{
      $state.go('inbox', {page: 1});
    }
  }
]);
