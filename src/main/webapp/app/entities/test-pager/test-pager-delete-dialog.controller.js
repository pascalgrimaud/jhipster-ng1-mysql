(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestPagerDeleteController',TestPagerDeleteController);

    TestPagerDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestPager'];

    function TestPagerDeleteController($uibModalInstance, entity, TestPager) {
        var vm = this;

        vm.testPager = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestPager.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
