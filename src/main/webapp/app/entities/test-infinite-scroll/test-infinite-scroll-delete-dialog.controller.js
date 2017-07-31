(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestInfiniteScrollDeleteController',TestInfiniteScrollDeleteController);

    TestInfiniteScrollDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestInfiniteScroll'];

    function TestInfiniteScrollDeleteController($uibModalInstance, entity, TestInfiniteScroll) {
        var vm = this;

        vm.testInfiniteScroll = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestInfiniteScroll.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
