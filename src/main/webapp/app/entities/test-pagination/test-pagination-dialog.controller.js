(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestPaginationDialogController', TestPaginationDialogController);

    TestPaginationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestPagination', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestPaginationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestPagination, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testPagination = entity;
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
            if (vm.testPagination.id !== null) {
                TestPagination.update(vm.testPagination, onSaveSuccess, onSaveError);
            } else {
                TestPagination.save(vm.testPagination, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testPaginationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
