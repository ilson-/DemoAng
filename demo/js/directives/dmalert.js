'use strict';
//
/*
Информационное окно (подсказка, сообщение)
*/

directivesModule.directive('dmalert', function(){
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/dmalert.csp',
        
        scope: {
            data: '=',
            spanRight: '@',
            spanMiddle: '@',
            spanLeft: '@'
        },
        controller: function($scope, $timeout){
          $scope.data = {visible: false};

          // При закрытии спрятать
          $scope.close = function(){
            $scope.data.visible = false;
	        };
	       
          // Отслеживать "видимость сообщения", 
          // если сообщение отображается и установлен таймер, то задать тамер скрытия сообщения
          $scope.$watch('data.visible', function(){
            if ($scope.data.visible && $scope.data.closeTimeout){
                $timeout(function(){$scope.close()}, $scope.data.closeTimeout);        
              }     
           });
	   	}
    }
});
