(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestEntityDetailController', FieldTestEntityDetailController);

    FieldTestEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestEntity'];

    function FieldTestEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestEntity) {
        var vm = this;

        vm.fieldTestEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestEntityUpdate', function(event, result) {
            vm.fieldTestEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
