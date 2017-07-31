(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestTwoRelationshipsSameEntityDeleteController',TestTwoRelationshipsSameEntityDeleteController);

    TestTwoRelationshipsSameEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'TestTwoRelationshipsSameEntity'];

    function TestTwoRelationshipsSameEntityDeleteController($uibModalInstance, entity, TestTwoRelationshipsSameEntity) {
        var vm = this;

        vm.testTwoRelationshipsSameEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TestTwoRelationshipsSameEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
