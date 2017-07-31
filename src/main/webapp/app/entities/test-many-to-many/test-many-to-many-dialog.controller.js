(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToManyDialogController', TestManyToManyDialogController);

    TestManyToManyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TestManyToMany', 'TestEntity', 'TestMapstruct', 'TestServiceClass', 'TestServiceImpl', 'TestInfiniteScroll', 'TestPager', 'TestPagination', 'TestCustomTableName'];

    function TestManyToManyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TestManyToMany, TestEntity, TestMapstruct, TestServiceClass, TestServiceImpl, TestInfiniteScroll, TestPager, TestPagination, TestCustomTableName) {
        var vm = this;

        vm.testManyToMany = entity;
        vm.clear = clear;
        vm.save = save;
        vm.testentities = TestEntity.query();
        vm.testmapstructs = TestMapstruct.query();
        vm.testserviceclasses = TestServiceClass.query();
        vm.testserviceimpls = TestServiceImpl.query();
        vm.testinfinitescrolls = TestInfiniteScroll.query();
        vm.testpagers = TestPager.query();
        vm.testpaginations = TestPagination.query();
        vm.testcustomtablenames = TestCustomTableName.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.testManyToMany.id !== null) {
                TestManyToMany.update(vm.testManyToMany, onSaveSuccess, onSaveError);
            } else {
                TestManyToMany.save(vm.testManyToMany, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testManyToManyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
