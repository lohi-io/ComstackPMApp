app.controller('InboxCtrl', ['$scope', '$window', '$state', '$stateParams', 'getCurrentUser', 'getConversations',
  function ($scope, $window, $state, $stateParams, userService, conversationsService) {

    $scope.conversations = [];
    $scope.paging = {};
    $scope.currentUser = {};

    userService.get()
      .then(function (data) {
        $scope.currentUser = data.data;
      });

    conversationsService.get($stateParams.page)
      .then(function (data) {
        $scope.conversations = data.data;
        $scope.paging = data.paging;
      });

    $scope.paging.pagesCount = 0;

    $scope.pages = [];

    $scope.calculatePages = function () {
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

    $scope.calculatePages();
  }
]);
