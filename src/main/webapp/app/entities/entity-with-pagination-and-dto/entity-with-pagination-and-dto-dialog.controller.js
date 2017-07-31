(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithPaginationAndDTODialogController', EntityWithPaginationAndDTODialogController);

    EntityWithPaginationAndDTODialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithPaginationAndDTO'];

    function EntityWithPaginationAndDTODialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithPaginationAndDTO) {
        var vm = this;

        vm.entityWithPaginationAndDTO = entity;
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
            if (vm.entityWithPaginationAndDTO.id !== null) {
                EntityWithPaginationAndDTO.update(vm.entityWithPaginationAndDTO, onSaveSuccess, onSaveError);
            } else {
                EntityWithPaginationAndDTO.save(vm.entityWithPaginationAndDTO, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithPaginationAndDTOUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
