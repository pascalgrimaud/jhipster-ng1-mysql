(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestCustomTableNameDeleteController',TestCustomTableNameDeleteController);

    TestCustomTableNameDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestCustomTableName'];

    function TestCustomTableNameDeleteController($uibModalInstance, entity, TestCustomTableName) {
        var vm = this;

        vm.testCustomTableName = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestCustomTableName.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
