(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassDeleteController',EntityWithServiceClassDeleteController);

    EntityWithServiceClassDeleteController.$inject = ['$uibModalInstance', 'entity', 'EntityWithServiceClass'];

    function EntityWithServiceClassDeleteController($uibModalInstance, entity, EntityWithServiceClass) {
        var vm = this;

        vm.entityWithServiceClass = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntityWithServiceClass.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
