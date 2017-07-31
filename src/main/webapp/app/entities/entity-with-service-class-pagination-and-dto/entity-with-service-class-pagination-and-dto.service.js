(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceClassPaginationAndDTO', EntityWithServiceClassPaginationAndDTO);

    EntityWithServiceClassPaginationAndDTO.$inject = ['$resource'];

    function EntityWithServiceClassPaginationAndDTO ($resource) {
        var resourceUrl =  'api/entity-with-service-class-pagination-and-dtos/:id';

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
