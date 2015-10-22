var services = angular.module('ComstackPMApp.Services');
services.service('errorState', ['$injector',  errorState]);

function errorState($injector) {
  this.activate = function (templateUrl, error) {
    var modal = $injector.get('$modal');
     modal.open({
      templateUrl: templateUrl,
      controller: 'ErrorCtrl',
      resolve: {error: error},
      backdrop: 'static',
      size: 'sm'
    });
  }
}
