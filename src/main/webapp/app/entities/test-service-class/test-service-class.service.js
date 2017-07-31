(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestServiceClass', TestServiceClass);

    TestServiceClass.$inject = ['$resource'];

    function TestServiceClass ($resource) {
        var resourceUrl =  'api/test-service-classes/:id';

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
