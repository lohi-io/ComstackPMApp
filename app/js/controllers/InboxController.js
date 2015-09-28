app.controller('InboxCtrl', ['$scope', '$window', '$state', '$stateParams', 'getCurrentUser', 'Conversations', 'ConfigurationService',
  function ($scope, $window, $state, $stateParams, userService, Conversations, config) {

    var settings = config.get();

    $scope.conversations = [];
    $scope.paging = {};
    $scope.currentUser = {};

    userService.get()
      .then(function (data) {
        $scope.currentUser = data.data;
      });

    Conversations.get({page: $stateParams.page}).$promise.then(function (data) {
        $scope.conversations = data.data;
        $scope.paging = data.paging;
      });

    $scope.paging.pagesCount = 0;
    $scope.pages = [];

    var calculatePages = function () {
      $scope.paging.pagesCount = $window.Math.ceil($scope.paging.total / $scope.paging.range);

      for (var i = 0; i < $scope.paging.pagesCount; i++) {
        $scope.pages[i] = {
          number: i + 1
        };
      }
    };

    $scope.goToPage = function (page) {
      $state.go('inbox', {
        page: page
      });
    };

    $scope.previous = function () {
      if (angular.isDefined($scope.paging.previous)) {
        $scope.goToPage($scope.paging.current_page - 1);
      }
    };

    $scope.next = function () {
      if (angular.isDefined($scope.paging.next)) {
        $scope.goToPage($scope.paging.current_page + 1);
      }
    };

    $scope.fromNow = function(date){
      return moment(date).fromNow();
    };

    $scope.formatDate = function(date){
      return moment(date).format("hh:mm MMMM Do, YYYY")
    }

    $scope.testString = config.getString('text__read_only', {user_id: "12345", name: "faustina"});


    calculatePages();
  }
]);
