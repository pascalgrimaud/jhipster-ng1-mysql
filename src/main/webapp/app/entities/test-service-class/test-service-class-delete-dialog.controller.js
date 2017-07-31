(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceClassDeleteController',TestServiceClassDeleteController);

    TestServiceClassDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestServiceClass'];

    function TestServiceClassDeleteController($uibModalInstance, entity, TestServiceClass) {
        var vm = this;

        vm.testServiceClass = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestServiceClass.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
