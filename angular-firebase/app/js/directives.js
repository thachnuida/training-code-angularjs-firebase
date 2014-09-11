'use strict';

/* Directives */
var chatDirectives= angular.module('chatDirectives',[]);

chatDirectives.directive('youtube',
  function($sce){
    return {
      restrict: 'EA',
      scope: {
        linkInfo: '=model'
      },
      replace:true,
      template: '<div>'+
                  '<iframe style="overflow:hidden;"src="{{url}}" frameborder="0"></iframe>'+
                '</div>',
      link: function(scope){
        scope.$watch('linkInfo', function () {
          if (scope.linkInfo){
            scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + scope.linkInfo);
          }
        });
      }
    }
});