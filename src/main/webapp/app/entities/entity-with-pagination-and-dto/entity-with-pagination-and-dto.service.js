(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithPaginationAndDTO', EntityWithPaginationAndDTO);

    EntityWithPaginationAndDTO.$inject = ['$resource'];

    function EntityWithPaginationAndDTO ($resource) {
        var resourceUrl =  'api/entity-with-pagination-and-dtos/:id';

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
