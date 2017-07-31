(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndDTODialogController', EntityWithServiceClassAndDTODialogController);

    EntityWithServiceClassAndDTODialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceClassAndDTO'];

    function EntityWithServiceClassAndDTODialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceClassAndDTO) {
        var vm = this;

        vm.entityWithServiceClassAndDTO = entity;
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
            if (vm.entityWithServiceClassAndDTO.id !== null) {
                EntityWithServiceClassAndDTO.update(vm.entityWithServiceClassAndDTO, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceClassAndDTO.save(vm.entityWithServiceClassAndDTO, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceClassAndDTOUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
