'use strict';
//dddxddddddвddd

/*===========================================================================================
Группа
===========================================================================================*/

servicesModule.factory('GroupSrvc', function(RESTSrvc) {    
    return {
        /* Сохранить / создать группу */
        save: function(group){
            return RESTSrvc.getPromise({method: 'POST', url: DemoSetting.appName + '/json/group', data: group});
        },
        /* Удалить группу по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: DemoSetting.appName + '/json/group/' + id});
        },
        /* Получить группу по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/group/' + id});
        },
        /* Получить все группы */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/group'});
        },
        /* Получить всех студентов группы */
        getStudents: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/group/' + id + '/student'});
        }
    }
});
