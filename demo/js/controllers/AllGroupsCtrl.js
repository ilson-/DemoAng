'use strict';
//dd

/*===========================================================================================
Все группы
===========================================================================================*/

controllersModule.controller('AllGroupsCtrl', function($scope, $location, GroupSrvc){

   // Инициализация данных
   $scope.init = function(){
     /* Данные для таблицы с группами, объект будет передан в компонент dmgrid
        Заголовок таблицы. 
        Сss класс для таблицы. 
        Имена колонок и имя свойства для доступа к значению.
        Методы для работы с данными */
        $scope.grid = {
            caption: 'Группы',
            cssClass: 'table table-bordered table-hover',
            columns: [{name: 'Название', property: 'name'}, 
                      {name: 'Факультет', property: 'facultyName'}],
            remove: $scope.removeById,
            add: $scope.add

        };

        $scope.loadGroups();
   };

   // Загрузить все группы
   $scope.loadGroups = function(){
    
        GroupSrvc.getAll().then(
            function(data){
                $scope.grid.items = data;
            },
            function(data, status, headers, config){
                $scope.gralert = {title: 'Внимание!', msg: 'Грыппы не загружены. ' + data, cssClass: 'alert alert-error', visible: true};  
            });      
   };

   $scope.removeById = function(item){
        GroupSrvc.deleteById(item.id).then(
            function(data){
                $scope.gralert = {title: 'Готово!', msg: 'Группа удалена.', cssClass: 'alert alert-success', visible: true, closeTimeout: 1500};
                $scope.loadGroups();
                $scope.grid.selected = null;
            },
            function(data, status, headers, config){
                console.log(data);
                $scope.gralert = {title: 'Внимание!', msg: 'Грыппа не удалена! ' + data, cssClass: 'alert alert-error', visible: true};  
            }); 
   };

   $scope.add = function(){
       $location.path('/group');
   };

   $scope.init(); 
});

