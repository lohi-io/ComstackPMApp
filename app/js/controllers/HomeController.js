/**
 * Created by fechit01 on 11/09/2015.
 */
app.controller('HomeCtrl', ['$scope', 'Authentication', '$timeout', '$state',
    function($scope,  Authentication, $timeout, $state)
    {
        Authentication.apiLogin().then(function() {
            console.log("Login done")
            $state.go('inbox', {page:1});
        }, function(error) {
            console.error(error)
        })


    }
]);