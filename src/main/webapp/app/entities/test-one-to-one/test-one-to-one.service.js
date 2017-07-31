(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestOneToOne', TestOneToOne);

    TestOneToOne.$inject = ['$resource'];

    function TestOneToOne ($resource) {
        var resourceUrl =  'api/test-one-to-ones/:id';

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
