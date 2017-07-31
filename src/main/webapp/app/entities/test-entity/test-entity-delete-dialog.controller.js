(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestEntityDeleteController',TestEntityDeleteController);

    TestEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestEntity'];

    function TestEntityDeleteController($uibModalInstance, entity, TestEntity) {
        var vm = this;

        vm.testEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
