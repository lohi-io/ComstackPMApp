/**
 * Created by fechit01 on 05/10/2015.
 */
app.controller('ReportConversationCtrl', [
  '$scope', '$modalInstance', 'Conversation', '$stateParams', 'configurationService',
  function ($scope, $modalInstance, Conversation, $stateParams, config) {

    var reasonsValues = {
      isSpam: 'spam',
      isAbuse: 'abuse',
      isBreach: 'breach',
      isUnknown: 'unknown',
      isOther: 'other'
    };


    $scope.modal_report_heading = config.getString('modal__report__heading');

    $scope.other_reason_maxlength = config.getSetting('text__maxlength');

    $scope.data = {
      isSpam: false,
      isAbuse: false,
      isBreach: false,
      isUnknown: false,
      isOther: false,
      otherDetails: ""
    };


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.confirm = function () {



      var report = {
        'conversation_id': $stateParams.id,
        'reasons': [],
        'other_reason': $scope.data.otherDetails,
        'posts': []
      };

      $scope.data.isSpam ? report.reasons.push(reasonsValues.isSpam):'';
      $scope.data.isAbuse ? report.reasons.push(reasonsValues.isAbuse):'';
      $scope.data.isBreach ? report.reasons.push(reasonsValues.isBreach):'';
      $scope.data.isUnknown ? report.reasons.push(reasonsValues.isUnknown):'';
      $scope.data.isOther ? report.reasons.push(reasonsValues.isOther):'';

      Conversation.report({}, report, function () {
        $modalInstance.close(true);
      },
        function (error) {
          //error handling;
          console.log(error);
        });
    };
  }
]);
