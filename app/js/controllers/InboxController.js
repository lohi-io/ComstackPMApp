/**
 * Created by fechit01 on 11/09/2015.
 */
app.controller('InboxCtrl', ['$scope', 'currentUser', 'conversations', '$state', '$stateParams',
    function($scope, currentUser, conversations, $state, $stateParams)
    {
        $scope.currentPage = $stateParams.page;
        $scope.currentUser = currentUser;
        $scope.conversations = conversations.data;
        $scope.conversationsCount = conversations.count;

        $scope.goToPage = function(page){
            $state.go('inbox', {page: page})
        };

        $scope.previous = function(){
            if(angular.isDefined($scope.conversations.previous)){
                $scope.goToPage($scope.currentPage - 1);
            }
        };

        $scope.next = function(){
            if(angular.isDefined($scope.conversations.next)){
                $scope.goToPage($scope.currentPage + 1);
            }
        };

    }
]);

