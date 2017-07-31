(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceClassEntityDetailController', FieldTestServiceClassEntityDetailController);

    FieldTestServiceClassEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestServiceClassEntity'];

    function FieldTestServiceClassEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestServiceClassEntity) {
        var vm = this;

        vm.fieldTestServiceClassEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestServiceClassEntityUpdate', function(event, result) {
            vm.fieldTestServiceClassEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
