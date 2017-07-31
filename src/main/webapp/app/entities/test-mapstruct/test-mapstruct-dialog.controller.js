(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestMapstructDialogController', TestMapstructDialogController);

    TestMapstructDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestMapstruct', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestMapstructDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestMapstruct, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testMapstruct = entity;
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
            if (vm.testMapstruct.id !== null) {
                TestMapstruct.update(vm.testMapstruct, onSaveSuccess, onSaveError);
            } else {
                TestMapstruct.save(vm.testMapstruct, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testMapstructUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
