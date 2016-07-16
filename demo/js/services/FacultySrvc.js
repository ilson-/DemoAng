'use strict';
//dddxddddddвddde

/*===========================================================================================
Факультет
===========================================================================================*/

servicesModule.factory('FacultySrvc', function(RESTSrvc) {    
    return {
    	/* Все факультеты */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/faculty'});
        },
        /* Все группы факультета */
        getGroups: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/faculty/' + id + '/group'});
        },


    }
});
