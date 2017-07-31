(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassPaginationAndDTODeleteController',EntityWithServiceClassPaginationAndDTODeleteController);

    EntityWithServiceClassPaginationAndDTODeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceClassPaginationAndDTO'];

    function EntityWithServiceClassPaginationAndDTODeleteController($uibModalInstance, entity, EntityWithServiceClassPaginationAndDTO) {
        var vm = this;

        vm.entityWithServiceClassPaginationAndDTO = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceClassPaginationAndDTO.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
