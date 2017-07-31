(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestPagerEntity', FieldTestPagerEntity);

    FieldTestPagerEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestPagerEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-pager-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateJade = DateUtils.convertLocalDateFromServer(data.localDateJade);
                        data.localDateRequiredJade = DateUtils.convertLocalDateFromServer(data.localDateRequiredJade);
                        data.zonedDateTimeJade = DateUtils.convertDateTimeFromServer(data.zonedDateTimeJade);
                        data.zonedDateTimeRequiredJade = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredJade);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateJade = DateUtils.convertLocalDateToServer(copy.localDateJade);
                    copy.localDateRequiredJade = DateUtils.convertLocalDateToServer(copy.localDateRequiredJade);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateJade = DateUtils.convertLocalDateToServer(copy.localDateJade);
                    copy.localDateRequiredJade = DateUtils.convertLocalDateToServer(copy.localDateRequiredJade);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
