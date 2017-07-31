(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestPager', TestPager);

    TestPager.$inject = ['$resource'];

    function TestPager ($resource) {
        var resourceUrl =  'api/test-pagers/:id';

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
