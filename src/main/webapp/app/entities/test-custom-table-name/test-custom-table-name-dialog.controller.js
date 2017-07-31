(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestCustomTableNameDialogController', TestCustomTableNameDialogController);

    TestCustomTableNameDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestCustomTableName', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'TestEntity', 'User'];

    function TestCustomTableNameDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestCustomTableName, TestManyToOne, TestManyToMany, TestOneToOne, TestEntity, User) {
        var vm = this;

        vm.testCustomTableName = entity;
        vm.clear = clear;
        vm.save = save;
        vm.testmanytoones = TestManyToOne.query();
        vm.testmanytomanies = TestManyToMany.query();
        vm.testonetoones = TestOneToOne.query();
        vm.testentities = TestEntity.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.testCustomTableName.id !== null) {
                TestCustomTableName.update(vm.testCustomTableName, onSaveSuccess, onSaveError);
            } else {
                TestCustomTableName.save(vm.testCustomTableName, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testCustomTableNameUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
