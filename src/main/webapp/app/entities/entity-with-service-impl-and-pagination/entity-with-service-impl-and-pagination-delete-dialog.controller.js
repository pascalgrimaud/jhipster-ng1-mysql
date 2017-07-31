(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndPaginationDeleteController',EntityWithServiceImplAndPaginationDeleteController);

    EntityWithServiceImplAndPaginationDeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceImplAndPagination'];

    function EntityWithServiceImplAndPaginationDeleteController($uibModalInstance, entity, EntityWithServiceImplAndPagination) {
        var vm = this;

        vm.entityWithServiceImplAndPagination = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceImplAndPagination.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
