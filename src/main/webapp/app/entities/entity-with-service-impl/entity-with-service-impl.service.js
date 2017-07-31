(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithServiceImpl', EntityWithServiceImpl);

    EntityWithServiceImpl.$inject = ['$resource'];

    function EntityWithServiceImpl ($resource) {
        var resourceUrl =  'api/entity-with-service-impls/:id';

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
