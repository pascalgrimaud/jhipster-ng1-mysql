(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('TestInfiniteScroll', TestInfiniteScroll);

    TestInfiniteScroll.$inject = ['$resource'];

    function TestInfiniteScroll ($resource) {
        var resourceUrl =  'api/test-infinite-scrolls/:id';

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
