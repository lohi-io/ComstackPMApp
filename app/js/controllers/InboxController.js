app.controller('InboxCtrl', ['$scope', '$window', '$state', '$stateParams', 'getCurrentUser', 'getConversations', 'configurationService',
  function ($scope, $window, $state, $stateParams, userService, conversationsService, config) {

    var calculatePages = function () {
      $scope.paging.pagesCount = $window.Math.ceil($scope.paging.total / $scope.paging.range);

      for (var i = 0; i < $scope.paging.pagesCount; i++) {
        $scope.pages[i] = {
          number: i + 1
        };
      }
    };

    var computeStrings = function (){
      $scope.text_heading_messages = config.getString('heading__messages', {});
      $scope.text_last_message = config.getString('text__last_message', {});
      $scope.text_read_only = config.getString('text__read_only', {name: $scope.currentUser.user.name, user_id: $scope.currentUser.user.id});
      $scope.text_link_delete = config.getString('link__delete',{});
      $scope.text_link_report = config.getString('link__report',{});
    };

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
        calculatePages();
        computeStrings();
      });

    $scope.paging.pagesCount = 0;
    $scope.pages = [];



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
    };







  }
]);
