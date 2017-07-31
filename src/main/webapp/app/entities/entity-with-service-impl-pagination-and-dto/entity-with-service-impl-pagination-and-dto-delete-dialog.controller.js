(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplPaginationAndDTODeleteController',EntityWithServiceImplPaginationAndDTODeleteController);

    EntityWithServiceImplPaginationAndDTODeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceImplPaginationAndDTO'];

    function EntityWithServiceImplPaginationAndDTODeleteController($uibModalInstance, entity, EntityWithServiceImplPaginationAndDTO) {
        var vm = this;

        vm.entityWithServiceImplPaginationAndDTO = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceImplPaginationAndDTO.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
