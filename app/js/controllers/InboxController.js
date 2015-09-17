app.controller('InboxCtrl', ['$scope', '$window', 'currentUser', 'conversations', '$state', '$stateParams',
    function($scope, $window, currentUser, conversations, $state, $stateParams) {
        $scope.currentUser = currentUser;
        $scope.conversations = conversations.data;

        $scope.paging = conversations.paging;
        $scope.paging.pages_count = $window.Math.ceil($scope.paging.total / $scope.paging.range);

        $scope.pages = [];

        for (var i = 0; i < $scope.paging.pages_count; i++) {
          $scope.pages[i] = {
            number: i + 1
          };
        }

        $scope.goToPage = function(page){
            $state.go('inbox', {page: page})
        };

        $scope.previous = function(){
            if(angular.isDefined($scope.paging.previous)){
                $scope.goToPage($scope.paging.current_page - 1);
            }
        };

        $scope.next = function(){
            if(angular.isDefined($scope.paging.next)){
                $scope.goToPage($scope.paging.current_page + 1);
            }
        };

    }
]);

