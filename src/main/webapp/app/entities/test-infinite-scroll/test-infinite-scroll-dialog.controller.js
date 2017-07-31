(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestInfiniteScrollDialogController', TestInfiniteScrollDialogController);

    TestInfiniteScrollDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestInfiniteScroll', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestInfiniteScrollDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestInfiniteScroll, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testInfiniteScroll = entity;
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
            if (vm.testInfiniteScroll.id !== null) {
                TestInfiniteScroll.update(vm.testInfiniteScroll, onSaveSuccess, onSaveError);
            } else {
                TestInfiniteScroll.save(vm.testInfiniteScroll, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testInfiniteScrollUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
