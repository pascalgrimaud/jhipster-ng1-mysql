(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestMapstructDeleteController',TestMapstructDeleteController);

    TestMapstructDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestMapstruct'];

    function TestMapstructDeleteController($uibModalInstance, entity, TestMapstruct) {
        var vm = this;

        vm.testMapstruct = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestMapstruct.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
