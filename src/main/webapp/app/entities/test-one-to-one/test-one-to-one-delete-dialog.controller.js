(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestOneToOneDeleteController',TestOneToOneDeleteController);

    TestOneToOneDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestOneToOne'];

    function TestOneToOneDeleteController($uibModalInstance, entity, TestOneToOne) {
        var vm = this;

        vm.testOneToOne = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestOneToOne.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
