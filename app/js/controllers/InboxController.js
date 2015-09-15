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

        }

        //$scope.previous = function(){
        //    if(angular.isDefined($scope.conversations.previous)){
        //
        //    }
        //    var page = $scope.page == 1?  $scope.page :  $scope.page - 1;
        //
        //}
        //
        //$scope.next = function(){
        //    var page = $scope.page == 1?  $scope.page :  $scope.page - 1;
        //    $scope.goToPage(page);
        //}
    }
]);

