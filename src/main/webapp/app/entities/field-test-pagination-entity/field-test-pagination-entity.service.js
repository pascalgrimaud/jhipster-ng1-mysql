(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestPaginationEntity', FieldTestPaginationEntity);

    FieldTestPaginationEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestPaginationEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-pagination-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateAlice = DateUtils.convertLocalDateFromServer(data.localDateAlice);
                        data.localDateRequiredAlice = DateUtils.convertLocalDateFromServer(data.localDateRequiredAlice);
                        data.zonedDateTimeAlice = DateUtils.convertDateTimeFromServer(data.zonedDateTimeAlice);
                        data.zonedDateTimeRequiredAlice = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredAlice);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateAlice = DateUtils.convertLocalDateToServer(copy.localDateAlice);
                    copy.localDateRequiredAlice = DateUtils.convertLocalDateToServer(copy.localDateRequiredAlice);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateAlice = DateUtils.convertLocalDateToServer(copy.localDateAlice);
                    copy.localDateRequiredAlice = DateUtils.convertLocalDateToServer(copy.localDateRequiredAlice);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
