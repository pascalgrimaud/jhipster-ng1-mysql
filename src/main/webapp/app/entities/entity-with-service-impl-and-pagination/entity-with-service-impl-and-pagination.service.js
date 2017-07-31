(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceImplAndPagination', EntityWithServiceImplAndPagination);

    EntityWithServiceImplAndPagination.$inject = ['$resource'];

    function EntityWithServiceImplAndPagination ($resource) {
        var resourceUrl =  'api/entity-with-service-impl-and-paginations/:id';

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
