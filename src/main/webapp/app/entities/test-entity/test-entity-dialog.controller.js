(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestEntityDialogController', TestEntityDialogController);

    TestEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestEntity', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User', 'TestCustomTableName'];

    function TestEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestEntity, TestManyToOne, TestManyToMany, TestOneToOne, User, TestCustomTableName) {
        var vm = this;

        vm.testEntity = entity;
        vm.clear = clear;
        vm.save = save;
        vm.testmanytoones = TestManyToOne.query();
        vm.testmanytomanies = TestManyToMany.query();
        vm.testonetoones = TestOneToOne.query();
        vm.users = User.query();
        vm.testcustomtablenames = TestCustomTableName.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.testEntity.id !== null) {
                TestEntity.update(vm.testEntity, onSaveSuccess, onSaveError);
            } else {
                TestEntity.save(vm.testEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
