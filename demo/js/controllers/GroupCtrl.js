'use strict';
//ddcdddd

/*===========================================================================================
Группа. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('GroupCtrl', function($scope, $routeParams, GroupSrvc/*, FacultySrvc*/){

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
      
      // Загрузить факультеты
      $scope.loadFaculties();
   };

   // Загрузить  по ИД
   $scope.loadGroup = function(id){
    // TO DO 
   };

  // Загрузить все факультеты
  $scope.loadFaculties = function(){
      // TO DO 
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
              // Сделать форму "чистой" (блокируется кнопка)
              $scope.pageForm.$setPristine();
          },
          function(data, status, headers, config){
              $scope.alert = {title: 'Внимание!', msg: data, cssClass: 'alert alert-error', visible: true};  
          });
   };

   $scope.init(); 
});

