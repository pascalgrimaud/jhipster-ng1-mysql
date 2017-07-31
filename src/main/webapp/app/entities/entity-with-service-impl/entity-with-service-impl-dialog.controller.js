(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplDialogController', EntityWithServiceImplDialogController);

    EntityWithServiceImplDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceImpl'];

    function EntityWithServiceImplDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceImpl) {
        var vm = this;

        vm.entityWithServiceImpl = entity;
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
            if (vm.entityWithServiceImpl.id !== null) {
                EntityWithServiceImpl.update(vm.entityWithServiceImpl, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceImpl.save(vm.entityWithServiceImpl, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceImplUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
