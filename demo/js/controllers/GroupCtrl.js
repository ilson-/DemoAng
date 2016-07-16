'use strict';
//ddcd

/*===========================================================================================
Группа. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('GroupCtrl', function($scope, $routeParams, GroupSrvc, FacultySrvc){
	
   // Инициализация данных
   $scope.init = function(){
      if ($routeParams.id){
          $scope.formCaption = "Редактирование группы";
          $scope.formBtnSubmitName = "Сохранить";
          $scope.loadGroup($routeParams.id);        
      }
      else{
          $scope.formCaption = "Добавление группы";
          $scope.formBtnSubmitName = "Добавить";
      }
      
      $scope.loadFaculties();
   };

   // Загрузить группу по ИД
   $scope.loadGroup = function(id){
      GroupSrvc.get(id).then(
          function(data){
              $scope.group = data;
          },
          function(data, status, headers, config){
              $scope.gralert = {title: 'Внимание!', msg: 'Группы не загружены. ' + data, cssClass: 'alert alert-error', visible: true};  
          });  
   };

  // Загрузить все факультеты
  $scope.loadFaculties = function(){
      FacultySrvc.getAll(false).then(
          function(data){
              $scope.faculties = data.children;
          },
          function(data, status, headers, config){
              $scope.gralert = {title: 'Внимание!', msg: 'Факультеты не загружены. ' + data, cssClass: 'alert alert-error', visible: true};  
          });      
   };

   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.submit = function(){
      GroupSrvc.save($scope.group).then(
          function(data){
              var msg = 'Изменения сохранены.';

              if (!$routeParams.id){
                  msg = 'Группа добавлена.';
                  $scope.group = {};                        
              }

              $scope.alert = {title: 'Готово!', msg: msg, cssClass: 'alert alert-success', visible: true, closeTimeout: 1500};
              $scope.pageForm.$setPristine();
          },
          function(data, status, headers, config){
              $scope.alert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
          });
   };

   $scope.init(); 
});

