(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestEntityDeleteController',FieldTestEntityDeleteController);

    FieldTestEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestEntity'];

    function FieldTestEntityDeleteController($uibModalInstance, entity, FieldTestEntity) {
        var vm = this;

        vm.fieldTestEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
