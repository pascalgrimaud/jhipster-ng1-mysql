(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceClassAndPagination', EntityWithServiceClassAndPagination);

    EntityWithServiceClassAndPagination.$inject = ['$resource'];

    function EntityWithServiceClassAndPagination ($resource) {
        var resourceUrl =  'api/entity-with-service-class-and-paginations/:id';

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
