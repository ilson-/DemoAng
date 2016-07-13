'use strict';
/*
Рекомендации:
Модуль сервисов для описания сервисов.
Модуль контроллеров для описания котнроллеров.
Модуль директив для описания директив.
И модуль всего приложения, который зависит от вышеуказанных модулей и содержит код инициализации. (имя модуля указывается в ng-app на странице index.csp)



Добавление маршрутов(when).
[как называется маршрут], [путь до шаблона, который будет подгружен в блок ng-view], [контроллер, который будет связан с область видимости шаблона]

otherwise
Устанавливает определение маршрута, которое будет использоваться при изменении маршрута, когда никаких других совпадений не найдено.

Можно сразу прописать параметр для страницы, т.е. совершив переход /student/1 - мы в контроллере StudentCtrl сможем получить доступ к этому параметру.
$routeParams.id - параметр :id
*/

var servicesModule    = angular.module('servicesModule',[]);
var controllersModule = angular.module('controllersModule', []);
var directivesModule  = angular.module('directivesModule', []);
var mainModule        = angular.module('mainModule', ['servicesModule', 'controllersModule', 'directivesModule']);

mainModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/api',         {templateUrl: 'partials/api.csp',      controller: ''});
	$routeProvider.when('/students',    {templateUrl: 'partials/students.csp', controller: 'AllStudentsCtrl'});
	$routeProvider.when('/groups',    {templateUrl: 'partials/groups.csp', controller: 'AllGroupsCtrl'});
	$routeProvider.when('/group',    {templateUrl: 'partials/group.csp', controller: 'GroupCtrl'});
    $routeProvider.when('/student/:id', {templateUrl: 'partials/student.csp',  controller: 'StudentCtrl'});
    $routeProvider.when('/student/faculty/:fcId/group/:grId', {templateUrl: 'partials/student.csp',  controller: 'StudentCtrl'});
    
    $routeProvider.otherwise({redirectTo: '/students'});
  }]);
 