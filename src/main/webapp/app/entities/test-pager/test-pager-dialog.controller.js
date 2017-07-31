(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestPagerDialogController', TestPagerDialogController);

    TestPagerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestPager', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestPagerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestPager, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testPager = entity;
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
            if (vm.testPager.id !== null) {
                TestPager.update(vm.testPager, onSaveSuccess, onSaveError);
            } else {
                TestPager.save(vm.testPager, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testPagerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
