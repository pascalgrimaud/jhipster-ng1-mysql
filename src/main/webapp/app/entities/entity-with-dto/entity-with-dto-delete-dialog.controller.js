(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithDTODeleteController',EntityWithDTODeleteController);

    EntityWithDTODeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithDTO'];

    function EntityWithDTODeleteController($uibModalInstance, entity, EntityWithDTO) {
        var vm = this;

        vm.entityWithDTO = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithDTO.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
