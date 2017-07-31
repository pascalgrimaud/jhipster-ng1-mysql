(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceImplEntityDetailController', FieldTestServiceImplEntityDetailController);

    FieldTestServiceImplEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestServiceImplEntity'];

    function FieldTestServiceImplEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestServiceImplEntity) {
        var vm = this;

        vm.fieldTestServiceImplEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestServiceImplEntityUpdate', function(event, result) {
            vm.fieldTestServiceImplEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
