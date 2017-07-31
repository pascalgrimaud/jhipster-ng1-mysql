(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndPaginationDeleteController',EntityWithServiceClassAndPaginationDeleteController);

    EntityWithServiceClassAndPaginationDeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceClassAndPagination'];

    function EntityWithServiceClassAndPaginationDeleteController($uibModalInstance, entity, EntityWithServiceClassAndPagination) {
        var vm = this;

        vm.entityWithServiceClassAndPagination = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceClassAndPagination.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
