app.controller('InboxCtrl', ['$scope', '$window', '$state', '$stateParams', 'getCurrentUser', 'Conversation', 'configurationService', '$filter', '$modal',
  function ($scope, $window, $state, $stateParams, userService, Conversation, config, $filter, $modal) {

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
      $scope.button_new_conversation = config.getString('button__new_conversation',{});
      $scope.text_no_conversations = config.getString('text__no_conversations',{user_id: $scope.currentUser.user.id});
      $scope.friends_link = config.getSetting('base_url')+'/friends/'+$scope.currentUser.user.id;
    };

    $scope.conversations = [];
    $scope.paging = {};
    $scope.currentUser = {};

    userService.get()
      .then(function (data) {
        $scope.currentUser = data.data;
        computeStrings();
      });

    Conversation.get({page: $stateParams.page}).$promise.then(function (data) {
        $scope.conversations = data.data;
        $scope.paging = data.paging;
        calculatePages();
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


    $scope.delete = function(conversation){
      $scope.deleteModalInstance = $modal.open({
        templateUrl: 'deleteConversation',
        controller: 'DeleteConversationCtrl',
        backdrop: 'static',
        size: 'sm'
      });

      $scope.deleteModalInstance.result.then(function () {
        conversation.$delete();
      }, function () { });
    };


    $scope.computeHeading = function(conversation) {
      // The return of this function is used in template bindings so
      // we should make sure this doesn't error out if the current user hasn't been determined.
      if (angular.isUndefined($scope.currentUser.user)) {
        return '';
      }

      // use historical participants if participants array is empty
      var otherParticipants = conversation.participants;
      var otherParticipantNames = '';
      if (otherParticipants.length === 0) {
        otherParticipants = conversation.historical_participants;
      }

      // exclude current user from heading title
      otherParticipants = $filter('filter')(otherParticipants, { id: '!' + $scope.currentUser.user.id });

      angular.forEach(otherParticipants, function(participant, key) {
        var suffix = '';

        // if 2nd to last, add ' and '
        // if not last, add ', '
        if (key === otherParticipants.length - 2) {
          suffix = ' and ';
        } else if (key !== otherParticipants.length - 1) {
          suffix = ', ';
        }

        otherParticipantNames = otherParticipantNames + participant.name + suffix;
      });

      return config.getString('heading__conversation_with', { participants: otherParticipantNames });
    };
  }
]);
