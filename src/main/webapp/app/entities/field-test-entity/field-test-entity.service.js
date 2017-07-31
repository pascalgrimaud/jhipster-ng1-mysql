(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestEntity', FieldTestEntity);

    FieldTestEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateTom = DateUtils.convertLocalDateFromServer(data.localDateTom);
                        data.localDateRequiredTom = DateUtils.convertLocalDateFromServer(data.localDateRequiredTom);
                        data.zonedDateTimeTom = DateUtils.convertDateTimeFromServer(data.zonedDateTimeTom);
                        data.zonedDateTimeRequiredTom = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredTom);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateTom = DateUtils.convertLocalDateToServer(copy.localDateTom);
                    copy.localDateRequiredTom = DateUtils.convertLocalDateToServer(copy.localDateRequiredTom);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateTom = DateUtils.convertLocalDateToServer(copy.localDateTom);
                    copy.localDateRequiredTom = DateUtils.convertLocalDateToServer(copy.localDateRequiredTom);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
