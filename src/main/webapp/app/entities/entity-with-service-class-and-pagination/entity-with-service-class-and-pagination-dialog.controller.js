(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndPaginationDialogController', EntityWithServiceClassAndPaginationDialogController);

    EntityWithServiceClassAndPaginationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceClassAndPagination'];

    function EntityWithServiceClassAndPaginationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceClassAndPagination) {
        var vm = this;

        vm.entityWithServiceClassAndPagination = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.entityWithServiceClassAndPagination.id !== null) {
                EntityWithServiceClassAndPagination.update(vm.entityWithServiceClassAndPagination, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceClassAndPagination.save(vm.entityWithServiceClassAndPagination, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceClassAndPaginationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
