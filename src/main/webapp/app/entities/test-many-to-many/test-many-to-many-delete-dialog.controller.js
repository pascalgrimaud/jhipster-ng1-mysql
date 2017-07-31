(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToManyDeleteController',TestManyToManyDeleteController);

    TestManyToManyDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestManyToMany'];

    function TestManyToManyDeleteController($uibModalInstance, entity, TestManyToMany) {
        var vm = this;

        vm.testManyToMany = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestManyToMany.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
