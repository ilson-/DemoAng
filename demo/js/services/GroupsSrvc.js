'use strict';
//dddxdddddвdddd

/*===========================================================================================
Группы
===========================================================================================*/

servicesModule.factory('GroupSrvc', function(RESTSrvc) {    
    return {
        /* Получить всех  */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appNameUser + '/json/group'});
        },
        deleteById: function(id){
        	return RESTSrvc.getPromise({method: 'DELETE', url: DemoSetting.appNameAdmin + '/json/group/' + id});
        },
        save: function(item){
        	return RESTSrvc.getPromise({method: 'POST', url: DemoSetting.appNameAdmin + '/json/group', data: item});
        }
    }
});
