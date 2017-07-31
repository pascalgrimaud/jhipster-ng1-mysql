(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndDTODeleteController',EntityWithServiceImplAndDTODeleteController);

    EntityWithServiceImplAndDTODeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceImplAndDTO'];

    function EntityWithServiceImplAndDTODeleteController($uibModalInstance, entity, EntityWithServiceImplAndDTO) {
        var vm = this;

        vm.entityWithServiceImplAndDTO = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceImplAndDTO.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
