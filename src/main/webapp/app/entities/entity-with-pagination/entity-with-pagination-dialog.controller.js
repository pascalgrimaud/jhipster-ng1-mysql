(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithPaginationDialogController', EntityWithPaginationDialogController);

    EntityWithPaginationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithPagination'];

    function EntityWithPaginationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithPagination) {
        var vm = this;

        vm.entityWithPagination = entity;
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
            if (vm.entityWithPagination.id !== null) {
                EntityWithPagination.update(vm.entityWithPagination, onSaveSuccess, onSaveError);
            } else {
                EntityWithPagination.save(vm.entityWithPagination, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithPaginationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
