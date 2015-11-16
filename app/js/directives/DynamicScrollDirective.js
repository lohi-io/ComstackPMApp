var directives = angular.module('ComstackPMApp.Directives');
directives.directive("dynamicScroll", function() {
  return {
    restrict : "A",
    scope: {
      onScrollUp : '&',
      onScrollDown : '&',
      isLoading: '=',
      eofDown: '=',
      eofUp: '=',
      isMobile: '='
    },
    link : function($scope, element, attrs) {
           var rootElement = element[0];
           element.bind('scroll', function(){
             //console.log('scrolling');
             //console.log('rootElement.scrollHeight: '+rootElement.scrollHeight);
             //console.log('rootElement.scrollTop: '+rootElement.scrollTop);
             //console.log('rootElement.clientHeight: '+rootElement.clientHeight);
             if($scope.isMobile) {
               if(rootElement.scrollHeight - rootElement.scrollTop > rootElement.clientHeight){
                 //here to catch the scroll up
                 $scope.onScrollUp();
               }

               if(rootElement.scrollHeight - rootElement.scrollTop == rootElement.clientHeight){
                 $scope.onScrollDown();
               }

             }
             else{
             if(!$scope.eofUp) {
               if (rootElement.scrollTop <= rootElement.clientHeight * 0.30) {
                 if (!$scope.eofUp) {
                   rootElement.scrollTop = rootElement.clientHeight * 0.50;
                 } else {
                   rootElement.scrollTop = 0;
                 }
                 if (!$scope.isLoading && !$scope.eofUp) {
                   $scope.onScrollUp();
                 }
               }
             }

             if(rootElement.scrollHeight - rootElement.scrollTop == rootElement.clientHeight){
                 $scope.onScrollDown();
             }
             }
           });
    }
  }
});
