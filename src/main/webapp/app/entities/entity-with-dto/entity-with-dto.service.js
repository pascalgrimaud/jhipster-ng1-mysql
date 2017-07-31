(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('EntityWithDTO', EntityWithDTO);

    EntityWithDTO.$inject = ['$resource'];

    function EntityWithDTO ($resource) {
        var resourceUrl =  'api/entity-with-dtos/:id';

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
