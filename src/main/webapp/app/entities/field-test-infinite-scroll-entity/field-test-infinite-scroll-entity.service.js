(function() {
    'use strict';
    angular
        .module('travisMysqlApp')
        .factory('FieldTestInfiniteScrollEntity', FieldTestInfiniteScrollEntity);

    FieldTestInfiniteScrollEntity.$inject = ['$resource', 'DateUtils'];

    function FieldTestInfiniteScrollEntity ($resource, DateUtils) {
        var resourceUrl =  'api/field-test-infinite-scroll-entities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDateHugo = DateUtils.convertLocalDateFromServer(data.localDateHugo);
                        data.localDateRequiredHugo = DateUtils.convertLocalDateFromServer(data.localDateRequiredHugo);
                        data.zonedDateTimeHugo = DateUtils.convertDateTimeFromServer(data.zonedDateTimeHugo);
                        data.zonedDateTimeRequiredHugo = DateUtils.convertDateTimeFromServer(data.zonedDateTimeRequiredHugo);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateHugo = DateUtils.convertLocalDateToServer(copy.localDateHugo);
                    copy.localDateRequiredHugo = DateUtils.convertLocalDateToServer(copy.localDateRequiredHugo);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDateHugo = DateUtils.convertLocalDateToServer(copy.localDateHugo);
                    copy.localDateRequiredHugo = DateUtils.convertLocalDateToServer(copy.localDateRequiredHugo);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
