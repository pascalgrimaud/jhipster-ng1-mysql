(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceImplPaginationAndDTO', EntityWithServiceImplPaginationAndDTO);

    EntityWithServiceImplPaginationAndDTO.$inject = ['$resource'];

    function EntityWithServiceImplPaginationAndDTO ($resource) {
        var resourceUrl =  'api/entity-with-service-impl-pagination-and-dtos/:id';

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
