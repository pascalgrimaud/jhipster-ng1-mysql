(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithDTODialogController', EntityWithDTODialogController);

    EntityWithDTODialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithDTO'];

    function EntityWithDTODialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithDTO) {
        var vm = this;

        vm.entityWithDTO = entity;
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
            if (vm.entityWithDTO.id !== null) {
                EntityWithDTO.update(vm.entityWithDTO, onSaveSuccess, onSaveError);
            } else {
                EntityWithDTO.save(vm.entityWithDTO, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithDTOUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
