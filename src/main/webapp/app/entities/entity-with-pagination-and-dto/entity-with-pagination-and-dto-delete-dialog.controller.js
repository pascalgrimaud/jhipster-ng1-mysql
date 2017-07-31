(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithPaginationAndDTODeleteController',EntityWithPaginationAndDTODeleteController);

    EntityWithPaginationAndDTODeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithPaginationAndDTO'];

    function EntityWithPaginationAndDTODeleteController($uibModalInstance, entity, EntityWithPaginationAndDTO) {
        var vm = this;

        vm.entityWithPaginationAndDTO = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithPaginationAndDTO.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
