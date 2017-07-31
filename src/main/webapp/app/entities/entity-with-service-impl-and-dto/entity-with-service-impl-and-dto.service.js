(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceImplAndDTO', EntityWithServiceImplAndDTO);

    EntityWithServiceImplAndDTO.$inject = ['$resource'];

    function EntityWithServiceImplAndDTO ($resource) {
        var resourceUrl =  'api/entity-with-service-impl-and-dtos/:id';

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
