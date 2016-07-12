'use strict';
//dd

/*===========================================================================================
Все студенты
===========================================================================================*/

controllersModule.controller('AllStudentsCtrl', function($scope, $location, StudentSrvc){

   // Инициализация данных
   $scope.init = function(){
     /* Данные для таблицы с группами, объект будет передан в компонент dmgrid
        Заголовок таблицы. 
        Сss класс для таблицы. 
        Имена колонок и имя свойства для доступа к значению.
        Методы для работы с данными */
        $scope.grid = {
            caption: 'Студенты',
            cssClass: 'table table-bordered table-hover',
            columns: [{name: 'Фамилия', property: 'lname'}, 
                      {name: 'Имя', property: 'fname'},
                      {name: 'Email', property: 'email'},
                      {name: 'Адрес', property: 'address'},
                      {name: 'Группа', property: 'groupName'},
                      {name: 'Факультет', property: 'facultyName'}],
            add: $scope.addStudent,
            edit: $scope.editStudent,
            remove: $scope.removeStudent
        };

        $scope.loadStudents();
   };

   // Загрузить всех студентов
   $scope.loadStudents = function(){
        StudentSrvc.getAll().then(
            function(data){
                $scope.grid.items = data;
            },
            function(data, status, headers, config){
                $scope.gralert = {title: 'Внимание!', msg: 'Студенты не загружены. ' + data, cssClass: 'alert alert-error', visible: true};  
            });      
   };

   // Перейти на др. страницу для добавления студента
   $scope.addStudent = function(){
        $location.path('/student/');
   };

   // Перейти на др. страницу для редактирования студента по ИД
   $scope.editStudent = function(student){
        $location.path('/student/' + student.id);
   };

   // Удалить студента по ИД
   $scope.removeStudent = function(student){
        StudentSrvc.remove(student.id).then(
            function(data){
              	$scope.alert = {title: 'Готово!', msg: 'Студент удален.', cssClass: 'alert alert-success', visible: true, closeTimeout: 1500};
            	  $scope.loadStudents();
            	  $scope.grid.selected = null;
            },
            function(data, status, headers, config){
                $scope.alert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
            });
   };

   $scope.init(); 
});

