(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndDTODialogController', EntityWithServiceImplAndDTODialogController);

    EntityWithServiceImplAndDTODialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceImplAndDTO'];

    function EntityWithServiceImplAndDTODialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceImplAndDTO) {
        var vm = this;

        vm.entityWithServiceImplAndDTO = entity;
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
            if (vm.entityWithServiceImplAndDTO.id !== null) {
                EntityWithServiceImplAndDTO.update(vm.entityWithServiceImplAndDTO, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceImplAndDTO.save(vm.entityWithServiceImplAndDTO, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceImplAndDTOUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
