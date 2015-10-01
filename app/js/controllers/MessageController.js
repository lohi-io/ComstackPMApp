app.controller('MessageCtrl', ['$scope', '$state', 'getAvailableUsers', 'configurationService', 'Conversation', '$http', '$q',
  function ($scope, $state, getAvailableUsers, config, Conversation, $http, $q) {

    $scope.message = new Conversation({
      recipients: [],
      text: ""
    });

    $scope.users = [];

    $scope.getAvailableUsers = function (search) {
      return getAvailableUsers.get(search).then(function (response) {
        return response.data.map(function (item) {
          return item;
        });
      });
    };

    $scope.new_conversation_header = config.getString('form__new_conversation__header', {user_id: ''});

    //var savePost = function(data)
    //{
    //  var deferred = $q.defer();
    //  console.log("Starting basic auth...");
    //  $http.defaults.useXDomain = true;
    //  $http.defaults.withCredentials = true;
    //  $http.post('https://cancerchat01dev.prod.acquia-sites.com/api/v1/cs-pm/conversations', data,
    //    { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
    //                 'X-CSRF-Token': 'bRv9z7xHezuHU0d_s7A7VCslg3Ek9t5nncZFpKGwKkA'
    //                 }
    //    }).success(function (response)
    //  {
    //    deferred.resolve(response);
    //  }).error(function(err, status)
    //  {
    //    deferred.reject(err);
    //  });
    //
    //  return deferred.promise;
    //};


    $scope.save = function () {

      $scope.message.recipients = $scope.users.map(function (item) {
        return item.id
      });

      //savePost($scope.message).then(function(response){
      //  console.log(response);
      //}, function(error){
      //  console.log(error);
      //});


     // $http.defaults.headers.post['X-CSRF-Token']= 'aoEEbSiYSyFumm70UGc-lHCpdNAvr71jPq5g1vKe-QQ';
      $scope.message.$save(function () {
        $state.go('conversation', {}, {
          reload: 'conversation',
          inherit: false,
          notify: true
        });
      },
        function (error) {
          //error handling;
          console.log(error);
        });
    }

  }
]);
