/**
 * Created by fechit01 on 11/09/2015.
 */
app.controller('InboxCtrl', ['$scope', 'currentUser', 'conversations',
    function($scope, currentUser, conversations)
    {
        $scope.message = "here is the inbox";
        $scope.currentUser = currentUser;
        $scope.conversations = conversations;
    }
]);

