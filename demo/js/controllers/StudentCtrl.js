'use strict';
//ddcdddd

/*===========================================================================================
Студент. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('StudentCtrl', function($scope, $routeParams, StudentSrvc, /*FacultySrvc*/){

   // Инициализация данных
   $scope.init = function(){
      if ($routeParams.id){
          $scope.formCaption = "Редактирование студента";
          $scope.formBtnSubmitName = "Сохранить";
          $scope.loadStudent($routeParams.id);        
      }
      else{
          $scope.formCaption = "Добавление студента";
          $scope.formBtnSubmitName = "Добавить";

          // Добавление студента в определённую группу
          if ($routeParams.grId && $routeParams.fcId){
              $scope.student = {group: {id: parseInt($routeParams.grId), faculty: {id: parseInt($routeParams.fcId)}}};            
          	  $scope.loadFacultyGroups($routeParams.fcId);
          }
      }
      
      // Загрузить факультеты
      $scope.loadFaculties();
   };

   // Загрузить студента по ИД
   $scope.loadStudent = function(id){
      StudentSrvc.get(id).then(
          function(data){
              $scope.student = data;
              // Загрузить группы факультета по ид факультета, на котором учится студент
      		    $scope.loadFacultyGroups(data.group.faculty.id);
          },
          function(data, status, headers, config){
              $scope.gralert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
          });       
   };

  // Загрузить все факультеты
  $scope.loadFaculties = function(){
      // TO DO 
   };

   // Загрузить все группы факультета
  $scope.loadFacultyGroups = function(id){
      // TO DO     
   };

   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.submit = function(){
      StudentSrvc.save($scope.student).then(
          function(data){
              var msg = 'Изменения сохранены.';

              if (!$routeParams.id){
                  msg = 'Студент добавлен.';
                  $scope.student = {};                        
              }

              $scope.alert = {title: 'Готово!', msg: msg, cssClass: 'alert alert-success', visible: true, closeTimeout: 1500};
              // Сделать форму "чистой" (блокируется кнопка)
              $scope.pageForm.$setPristine();
          },
          function(data, status, headers, config){
              $scope.alert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
          });
   };

   $scope.init(); 
});

