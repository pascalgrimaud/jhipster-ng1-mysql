(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndPaginationDialogController', EntityWithServiceImplAndPaginationDialogController);

    EntityWithServiceImplAndPaginationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntityWithServiceImplAndPagination'];

    function EntityWithServiceImplAndPaginationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntityWithServiceImplAndPagination) {
        var vm = this;

        vm.entityWithServiceImplAndPagination = entity;
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
            if (vm.entityWithServiceImplAndPagination.id !== null) {
                EntityWithServiceImplAndPagination.update(vm.entityWithServiceImplAndPagination, onSaveSuccess, onSaveError);
            } else {
                EntityWithServiceImplAndPagination.save(vm.entityWithServiceImplAndPagination, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:entityWithServiceImplAndPaginationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
