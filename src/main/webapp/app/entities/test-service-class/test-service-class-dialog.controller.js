(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceClassDialogController', TestServiceClassDialogController);

    TestServiceClassDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestServiceClass', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestServiceClassDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestServiceClass, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testServiceClass = entity;
        vm.clear = clear;
        vm.save = save;
        vm.testmanytoones = TestManyToOne.query();
        vm.testmanytomanies = TestManyToMany.query();
        vm.testonetoones = TestOneToOne.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.testServiceClass.id !== null) {
                TestServiceClass.update(vm.testServiceClass, onSaveSuccess, onSaveError);
            } else {
                TestServiceClass.save(vm.testServiceClass, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testServiceClassUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
