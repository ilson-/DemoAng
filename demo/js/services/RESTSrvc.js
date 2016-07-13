'use strict';
//dddxdddddвd

/*===========================================================================================
Доступ к БД через REST
===========================================================================================*/

servicesModule.factory('RESTSrvc', function($http, $q) {    
    return {
        getPromise: function(config){
            var deferred = $q.defer();

            $http(config).
                success(function(data, status, headers, config){
                    deferred.resolve(data.children ? data.children : data);
                }).
                error(function(data, status, headers, config){
                    if (data && data.summary){
                        data = data.summary;
                    }
                    
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    }
});
  
/*
Описание объекта config:
Объект описывающий создаваемый запрос. Этот объект имеет следующие свойства (свойств много, но в приложении используются только три):

var config = {
  method: 'POST'
  url: '/student',
  data: newStudent  
};

method – {string} – HTTP метод (напр. 'GET', 'POST', и т. д.)
url – {string} – Абсолютный или относительный URL для ресурса к которому будет запрос.
data – {string|Object} – Данные которые будут отправлены вместе с запросом.
*/


/*
$http возвращает {HttpPromise}.
Возвращает объект promise со стандартным методом then и двумя специфичными методами: success и error. 
Метод then имеет два аргумента, первый – колбэк, который будет выполнен в случае успешного ответа, второй – колбэк, который будет выполнен в случае ошибки. 
Методы success и error имеют по одному аргументу – колбэк, который будет выполнен в случае успешного завершения запроса или ошибки соответственно. 
Аргументы переданы в эти функции это деструктурированный объект ответа сервера переданный в метод then. Объект ответа от сервера имеет свойства:
    data – {string|Object} – Тело ответа преобразованное с помощью функций преобразования.
    status – {number} – код HTTP статуса ответа.
    headers – {function([headerName])} – Функция возвращающая заголовок по названию.
    config – {Object} – Конфигурационный объект, который был использован для создания запроса.
*/