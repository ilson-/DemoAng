'use strict';
//dddxdddddвdddd

/*===========================================================================================
Студент
===========================================================================================*/

servicesModule.factory('StudentSrvc', function(RESTSrvc) {    
    return {
        /* Сохранить / создать студента */
        save: function(student){
            return RESTSrvc.getPromise({method: 'POST', url: DemoSetting.appName + '/json/student', data: student});
        },
        /* Удалить студента по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: DemoSetting.appName + '/json/student/' + id});
        },
        /* Получить студента по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/student/' + id});
        },
        /* Получить всех студентов */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/student'});
        }
    }
});
