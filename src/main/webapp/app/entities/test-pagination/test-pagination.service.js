(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestPagination', TestPagination);

    TestPagination.$inject = ['$resource'];

    function TestPagination ($resource) {
        var resourceUrl =  'api/test-paginations/:id';

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
