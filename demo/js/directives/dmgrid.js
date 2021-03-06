'use strict';
//

/*
Таблица

replace - если установлено true, то шаблон заменит текущий элемент, а не добавится внутрь.


templateUrl - шаблон директивы


restrict - cтрока вида EACM (Element, Attribute, Class, Comment), задающая стиль определения директивы. Если опущена, директивы допускается только в атрибутах.
    E - имя элемента:: <my-directive></my-directive>
    A - атрибут: <div my-directive="exp"> </div>
    C - класс: <div class="my-directive: exp;"></div>
    M - комментарий: <!-- directive: my-directive exp -->


scope
{} (хэш-объект) - будет создана новая «изолированная» область. 
«Изолированная» область отличается от обычной тем, что она не прототипически унаследована от родительской области. 
Это полезно при создании повторно используемых компонентов, которые не должны случайно прочитать или изменить данные в родительской области.
«Изолированная» область принимает хэш-объект, устанавливающий свойства локальной области, полученные из родительской области. 
Эти локальные свойства полезны для сглаживания значений для шаблонов. 
Локальные установки являются хэшем свойств локальной области своего источника:
    @ или @attr - связывает свойства локальной области со значением атрибута в DOM. 
    Результат всегда является строкой с DOM-атрибутами (тоже строками). 
    Если имя атрибута attr не указано, то оно предполагается таким же как локальное имя. 

    = или =attr - создает двунаправленную связь между свойством локальной области и свойством родительской области, имя которого определено с помощью атрибута attr. 
    Если имя attr не указано, то оно предполагается таким же, как локальное имя. 

    & или &attr - обеспечивает способ выполнения выражение в контексте родительской области. 
    Если имя attr не указано, то оно предполагается таким же, как локальное имя. (Пример - передать метод, как параметр, и вызывать его в контроллере)


controller 
Функция-конструктор контроллера. 

*/

directivesModule.directive('dmgrid', function(){
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/dmgrid.csp',
        
        scope: {
            data: '=',
        },
        controller: function($scope){
            // Сортировка по выбранному стобцу, при изменении параметра сортирвки Angular сам "поймет" и заново выполнит вывод строк таблицы 
            $scope.sort = function(property, isUp){
	        	$scope.predicate = property; 
	        	$scope.isUp = !isUp;
	        	// Смена иконки
	        	$scope.sortIcon = 'icon-chevron-' + ($scope.isUp ? 'up':'down') + ' pull-right';		
	        };
            
            // Выбор строки в таблице
            $scope.select = function(item){
                if ($scope.data.selected){
	                $scope.data.selected.rowCss = '';
                	
                	if ($scope.data.selected == item){
                		$scope.data.selected = null;
                		return
                	}
                }
                
                $scope.data.selected = item;
                // При выборе меняем css класс строки таблицы (подсвечиваем строку)
                $scope.data.selected.rowCss = 'info';
            };

            // Метод для получения значения любого свойства объекта
            // Пример: 
            // var obj = {car: {body: {company: {name: 'Mazda'}}}};
            // getPropertyValue(obj, 'car.body.company.name') 
            //
            $scope.getPropertyValue = function(item, propertyStr){
                var value = item;
           
                try{
                        var properties = propertyStr.split('.');
                        for (var i = 0; i < properties.length; i++){
                            value = value[properties[i]];
                        
                            if (value !== Object(value))
                                break;
                        }
                }
                catch(ex){
                    console.log('Дело пахнет керосином');
                }
           
                return value == undefined ? '' : value;
            };
            
            // Выполнить начальную сортировку при инициализации контроллера
           	$scope.sort($scope.data.columns[0].property, true);
	   	}
    }
});
