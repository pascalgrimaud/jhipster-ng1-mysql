(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestCustomTableName', TestCustomTableName);

    TestCustomTableName.$inject = ['$resource'];

    function TestCustomTableName ($resource) {
        var resourceUrl =  'api/test-custom-table-names/:id';

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
