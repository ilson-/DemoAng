'use strict';
//ddd

/*===========================================================================================
Все группы
===========================================================================================*/

controllersModule.controller('AllGroupsCtrl', function($scope, $location, GroupSrvc, StudentSrvc){

    // Инициализация данных
    $scope.init = function(){
        /* Данные для таблицы с группами, объект будет передан в компонент dmgrid
           Заголовок таблицы. 
           Сss класс для таблицы. 
           Имена колонок и имя свойства для доступа к значению.
           Методы для работы с данными */
        $scope.grgrid = {
            caption: 'Группы',
            cssClass: 'table table-bordered table-hover',
            columns: [{name: 'Группа', property: 'name'}, 
                      {name: 'Факультет', property: 'faculty.name'},
                      {name: 'Количество студентов', property: 'students.length'}],
            add: $scope.addGroup,
            edit: $scope.editGroup,
            remove: $scope.removeGroup
        };

        // Данные для таблицы со студентами, объект будет передан в компонент dmgrid
        $scope.stgrid = {
            caption: 'Студенты',
            cssClass: 'table table-bordered table-hover',
            columns: [{name: 'Фамилия', property: 'lname'}, 
                      {name: 'Имя', property: 'fname'},
                      {name: 'Email', property: 'email'},
                      {name: 'Адрес', property: 'address'},
                      {name: 'Группа', property: 'group.name'},
                      {name: 'Факультет', property: 'group.faculty.name'}],
            add: $scope.addStudent,
            edit: $scope.editStudent,
            remove: $scope.removeStudent
        };

        // Загрузить все группы из БД
        $scope.loadGroups();
   };
  

    // Загрузить все группы из БД
    $scope.loadGroups = function(){
        GroupSrvc.getAll().then(
            function(data){
                // Успех. Передать данные в грид
                $scope.grgrid.items = data.children;
            },
            function(data, status, headers, config){
                // Ошибка
                $scope.gralert = {title: 'Внимание!', msg: 'Группы не загружены. ' + data, cssClass: 'alert alert-error', visible: true};  
            });      
    };

    // Загрузить студентов группы
    $scope.loadGroupStudents = function(group){
        GroupSrvc.getStudents(group.id).then(
            function(data){
                group.students = data.children;
            },
            function(data, status, headers, config){
                $scope.gralert = {title: 'Внимание!', msg: 'Студенты группы не загружены. ' + data, cssClass: 'alert alert-error', visible: true};  
            });       
    };

    // Добавить группу. Переход на другую страницу
    $scope.addGroup = function(){
        $location.path('/group/');
    };

    // Редактировать группу. Переход на другую страницу
    $scope.editGroup = function(group){
        $location.path('/group/' + group.id);
    };

    // Удалить группу
    $scope.removeGroup = function(group){
        GroupSrvc.remove(group.id).then(
            function(data){
                $scope.gralert = {title: 'Готово!', msg: 'Группа удалена.', cssClass: 'alert alert-success', visible: true, closeTimeout: 1500};
                $scope.loadGroups();
                $scope.grgrid.selected = null;
            },
            function(data, status, headers, config){
                $scope.gralert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
            });
    };

    // Добавить студента в группу, которая выбрана в таблице. Переход на другую страницу
    $scope.addStudent = function(){
        $location.path('/student/faculty/' + $scope.grgrid.selected.faculty.id + '/group/' + $scope.grgrid.selected.id);
    };

    // Редактировать студента. Переход на другую страницу
    $scope.editStudent = function(student){
        $location.path('/student/' + student.id);
    };

    // Удалить студента
    $scope.removeStudent = function(student){
        StudentSrvc.remove(student.id).then(
            function(data){
                $scope.stalert = {title: 'Готово!', msg: 'Студент удален.', cssClass: 'alert alert-success', visible: true, closeTimeout: 1500};
                $scope.loadGroupStudents($scope.grgrid.selected);
                $scope.stgrid.selected = null;
            },
            function(data, status, headers, config){
                $scope.stalert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
            });
    };

    // Отслеживание выбранной группы, если изменилась, то заменить студентво в таблице
    $scope.$watch('grgrid.selected', function(){
        if ($scope.grgrid.selected)
      	   $scope.stgrid.items = $scope.grgrid.selected.students;  
    },true);

    $scope.init(); 
});

