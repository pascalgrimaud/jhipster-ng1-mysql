(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassPaginationAndDTODialogController', EntityWithServiceClassPaginationAndDTODialogController);

    EntityWithServiceClassPaginationAndDTODialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceClassPaginationAndDTO'];

    function EntityWithServiceClassPaginationAndDTODialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceClassPaginationAndDTO) {
        var vm = this;

        vm.entityWithServiceClassPaginationAndDTO = entity;
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
            if (vm.entityWithServiceClassPaginationAndDTO.id !== null) {
                EntityWithServiceClassPaginationAndDTO.update(vm.entityWithServiceClassPaginationAndDTO, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceClassPaginationAndDTO.save(vm.entityWithServiceClassPaginationAndDTO, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceClassPaginationAndDTOUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
