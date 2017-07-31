(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestServiceClassEntity', FieldTestServiceClassEntity);

    FieldTestServiceClassEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestServiceClassEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-service-class-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateBob = DateUtils.convertLocalDateFromServer(data.localDateBob);
                        data.localDateRequiredBob = DateUtils.convertLocalDateFromServer(data.localDateRequiredBob);
                        data.zonedDateTimeBob = DateUtils.convertDateTimeFromServer(data.zonedDateTimeBob);
                        data.zonedDateTimeRequiredBob = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredBob);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateBob = DateUtils.convertLocalDateToServer(copy.localDateBob);
                    copy.localDateRequiredBob = DateUtils.convertLocalDateToServer(copy.localDateRequiredBob);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateBob = DateUtils.convertLocalDateToServer(copy.localDateBob);
                    copy.localDateRequiredBob = DateUtils.convertLocalDateToServer(copy.localDateRequiredBob);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
