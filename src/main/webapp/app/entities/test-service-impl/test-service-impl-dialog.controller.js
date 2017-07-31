(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceImplDialogController', TestServiceImplDialogController);

    TestServiceImplDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestServiceImpl', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestServiceImplDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestServiceImpl, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testServiceImpl = entity;
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
            if (vm.testServiceImpl.id !== null) {
                TestServiceImpl.update(vm.testServiceImpl, onSaveSuccess, onSaveError);
            } else {
                TestServiceImpl.save(vm.testServiceImpl, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testServiceImplUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
