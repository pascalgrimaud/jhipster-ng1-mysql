(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestManyToOne', TestManyToOne);

    TestManyToOne.$inject = ['$resource'];

    function TestManyToOne ($resource) {
        var resourceUrl =  'api/test-many-to-ones/:id';

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
