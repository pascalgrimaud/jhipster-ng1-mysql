(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceClassAndDTO', EntityWithServiceClassAndDTO);

    EntityWithServiceClassAndDTO.$inject = ['$resource'];

    function EntityWithServiceClassAndDTO ($resource) {
        var resourceUrl =  'api/entity-with-service-class-and-dtos/:id';

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
