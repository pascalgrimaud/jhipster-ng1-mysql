(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceClassEntityDeleteController',FieldTestServiceClassEntityDeleteController);

    FieldTestServiceClassEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestServiceClassEntity'];

    function FieldTestServiceClassEntityDeleteController($uibModalInstance, entity, FieldTestServiceClassEntity) {
        var vm = this;

        vm.fieldTestServiceClassEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestServiceClassEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
