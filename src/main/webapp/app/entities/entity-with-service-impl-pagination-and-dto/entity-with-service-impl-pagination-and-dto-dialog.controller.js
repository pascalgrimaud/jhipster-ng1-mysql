(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplPaginationAndDTODialogController', EntityWithServiceImplPaginationAndDTODialogController);

    EntityWithServiceImplPaginationAndDTODialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceImplPaginationAndDTO'];

    function EntityWithServiceImplPaginationAndDTODialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceImplPaginationAndDTO) {
        var vm = this;

        vm.entityWithServiceImplPaginationAndDTO = entity;
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
            if (vm.entityWithServiceImplPaginationAndDTO.id !== null) {
                EntityWithServiceImplPaginationAndDTO.update(vm.entityWithServiceImplPaginationAndDTO, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceImplPaginationAndDTO.save(vm.entityWithServiceImplPaginationAndDTO, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceImplPaginationAndDTOUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
