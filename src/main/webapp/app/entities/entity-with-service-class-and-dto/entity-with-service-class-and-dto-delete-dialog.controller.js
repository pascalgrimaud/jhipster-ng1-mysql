(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndDTODeleteController',EntityWithServiceClassAndDTODeleteController);

    EntityWithServiceClassAndDTODeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceClassAndDTO'];

    function EntityWithServiceClassAndDTODeleteController($uibModalInstance, entity, EntityWithServiceClassAndDTO) {
        var vm = this;

        vm.entityWithServiceClassAndDTO = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceClassAndDTO.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
