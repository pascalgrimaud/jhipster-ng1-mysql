(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToOneDeleteController',TestManyToOneDeleteController);

    TestManyToOneDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestManyToOne'];

    function TestManyToOneDeleteController($uibModalInstance, entity, TestManyToOne) {
        var vm = this;

        vm.testManyToOne = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestManyToOne.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
