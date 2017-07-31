(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassDialogController', EntityWithServiceClassDialogController);

    EntityWithServiceClassDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceClass'];

    function EntityWithServiceClassDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceClass) {
        var vm = this;

        vm.entityWithServiceClass = entity;
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
            if (vm.entityWithServiceClass.id !== null) {
                EntityWithServiceClass.update(vm.entityWithServiceClass, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceClass.save(vm.entityWithServiceClass, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceClassUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
