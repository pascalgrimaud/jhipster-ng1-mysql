(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestPaginationDeleteController',TestPaginationDeleteController);

    TestPaginationDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestPagination'];

    function TestPaginationDeleteController($uibModalInstance, entity, TestPagination) {
        var vm = this;

        vm.testPagination = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestPagination.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
