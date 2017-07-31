(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestInfiniteScrollEntityDetailController', FieldTestInfiniteScrollEntityDetailController);

    FieldTestInfiniteScrollEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestInfiniteScrollEntity'];

    function FieldTestInfiniteScrollEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestInfiniteScrollEntity) {
        var vm = this;

        vm.fieldTestInfiniteScrollEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestInfiniteScrollEntityUpdate', function(event, result) {
            vm.fieldTestInfiniteScrollEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
