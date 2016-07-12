'use strict';
//dddxdddddвdddd

/*===========================================================================================
Студент
===========================================================================================*/

servicesModule.factory('StudentSrvc', function(RESTSrvc) {    
    return {
        /* Получить всех студентов */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appNameUser + '/json/student'});
        }
    }
});
