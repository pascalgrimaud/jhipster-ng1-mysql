(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplDeleteController',EntityWithServiceImplDeleteController);

    EntityWithServiceImplDeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceImpl'];

    function EntityWithServiceImplDeleteController($uibModalInstance, entity, EntityWithServiceImpl) {
        var vm = this;

        vm.entityWithServiceImpl = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceImpl.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
