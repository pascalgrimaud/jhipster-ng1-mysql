(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithPaginationDeleteController',EntityWithPaginationDeleteController);

    EntityWithPaginationDeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithPagination'];

    function EntityWithPaginationDeleteController($uibModalInstance, entity, EntityWithPagination) {
        var vm = this;

        vm.entityWithPagination = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithPagination.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
