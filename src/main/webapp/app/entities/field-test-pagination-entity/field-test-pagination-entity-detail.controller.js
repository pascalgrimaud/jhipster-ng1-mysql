(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestPaginationEntityDetailController', FieldTestPaginationEntityDetailController);

    FieldTestPaginationEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestPaginationEntity'];

    function FieldTestPaginationEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestPaginationEntity) {
        var vm = this;

        vm.fieldTestPaginationEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestPaginationEntityUpdate', function(event, result) {
            vm.fieldTestPaginationEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
