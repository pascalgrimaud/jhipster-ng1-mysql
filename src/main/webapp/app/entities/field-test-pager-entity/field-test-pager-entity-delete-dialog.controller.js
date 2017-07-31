(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestPagerEntityDeleteController',FieldTestPagerEntityDeleteController);

    FieldTestPagerEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestPagerEntity'];

    function FieldTestPagerEntityDeleteController($uibModalInstance, entity, FieldTestPagerEntity) {
        var vm = this;

        vm.fieldTestPagerEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestPagerEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
