(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestEntity', TestEntity);

    TestEntity.$inject = ['$resource'];

    function TestEntity ($resource) {
        var resourceUrl =  'api/test-entities/:id';

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
