(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestMapstructEntityDeleteController',FieldTestMapstructEntityDeleteController);

    FieldTestMapstructEntityDeleteController.$inject = ['$uibModalInstance', 'entity', 'FieldTestMapstructEntity'];

    function FieldTestMapstructEntityDeleteController($uibModalInstance, entity, FieldTestMapstructEntity) {
        var vm = this;

        vm.fieldTestMapstructEntity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FieldTestMapstructEntity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
