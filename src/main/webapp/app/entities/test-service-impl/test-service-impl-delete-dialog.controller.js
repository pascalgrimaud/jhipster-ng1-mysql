(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceImplDeleteController',TestServiceImplDeleteController);

    TestServiceImplDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestServiceImpl'];

    function TestServiceImplDeleteController($uibModalInstance, entity, TestServiceImpl) {
        var vm = this;

        vm.testServiceImpl = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestServiceImpl.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
