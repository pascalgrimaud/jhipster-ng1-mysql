(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceImplEntityDeleteController',FieldTestServiceImplEntityDeleteController);

    FieldTestServiceImplEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestServiceImplEntity'];

    function FieldTestServiceImplEntityDeleteController($uibModalInstance, entity, FieldTestServiceImplEntity) {
        var vm = this;

        vm.fieldTestServiceImplEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestServiceImplEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
