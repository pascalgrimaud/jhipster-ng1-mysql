(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestMapstructEntity', FieldTestMapstructEntity);

    FieldTestMapstructEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestMapstructEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-mapstruct-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateEva = DateUtils.convertLocalDateFromServer(data.localDateEva);
                        data.localDateRequiredEva = DateUtils.convertLocalDateFromServer(data.localDateRequiredEva);
                        data.zonedDateTimeEva = DateUtils.convertDateTimeFromServer(data.zonedDateTimeEva);
                        data.zonedDateTimeRequiredEva = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredEva);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateEva = DateUtils.convertLocalDateToServer(copy.localDateEva);
                    copy.localDateRequiredEva = DateUtils.convertLocalDateToServer(copy.localDateRequiredEva);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateEva = DateUtils.convertLocalDateToServer(copy.localDateEva);
                    copy.localDateRequiredEva = DateUtils.convertLocalDateToServer(copy.localDateRequiredEva);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
