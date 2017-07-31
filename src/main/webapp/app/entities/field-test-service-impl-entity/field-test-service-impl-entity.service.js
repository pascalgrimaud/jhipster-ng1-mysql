(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestServiceImplEntity', FieldTestServiceImplEntity);

    FieldTestServiceImplEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestServiceImplEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-service-impl-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateMika = DateUtils.convertLocalDateFromServer(data.localDateMika);
                        data.localDateRequiredMika = DateUtils.convertLocalDateFromServer(data.localDateRequiredMika);
                        data.zonedDateTimeMika = DateUtils.convertDateTimeFromServer(data.zonedDateTimeMika);
                        data.zonedDateTimeRequiredMika = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredMika);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateMika = DateUtils.convertLocalDateToServer(copy.localDateMika);
                    copy.localDateRequiredMika = DateUtils.convertLocalDateToServer(copy.localDateRequiredMika);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateMika = DateUtils.convertLocalDateToServer(copy.localDateMika);
                    copy.localDateRequiredMika = DateUtils.convertLocalDateToServer(copy.localDateRequiredMika);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
