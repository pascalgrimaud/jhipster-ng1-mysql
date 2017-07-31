(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceClass', EntityWithServiceClass);

    EntityWithServiceClass.$inject = ['$resource'];

    function EntityWithServiceClass ($resource) {
        var resourceUrl =  'api/entity-with-service-classes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
