(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestPagerEntityDetailController', FieldTestPagerEntityDetailController);

    FieldTestPagerEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestPagerEntity'];

    function FieldTestPagerEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestPagerEntity) {
        var vm = this;

        vm.fieldTestPagerEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestPagerEntityUpdate', function(event, result) {
            vm.fieldTestPagerEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
