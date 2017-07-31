(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestInfiniteScrollEntityDeleteController',FieldTestInfiniteScrollEntityDeleteController);

    FieldTestInfiniteScrollEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestInfiniteScrollEntity'];

    function FieldTestInfiniteScrollEntityDeleteController($uibModalInstance, entity, FieldTestInfiniteScrollEntity) {
        var vm = this;

        vm.fieldTestInfiniteScrollEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestInfiniteScrollEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
