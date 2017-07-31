(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestServiceImpl', TestServiceImpl);

    TestServiceImpl.$inject = ['$resource'];

    function TestServiceImpl ($resource) {
        var resourceUrl =  'api/test-service-impls/:id';

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
