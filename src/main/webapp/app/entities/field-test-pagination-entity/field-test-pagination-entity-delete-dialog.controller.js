(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestPaginationEntityDeleteController',FieldTestPaginationEntityDeleteController);

    FieldTestPaginationEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestPaginationEntity'];

    function FieldTestPaginationEntityDeleteController($uibModalInstance, entity, FieldTestPaginationEntity) {
        var vm = this;

        vm.fieldTestPaginationEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestPaginationEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
