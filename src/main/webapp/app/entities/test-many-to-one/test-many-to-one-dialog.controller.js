(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToOneDialogController', TestManyToOneDialogController);

    TestManyToOneDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TestManyToOne', 'TestEntity', 'TestMapstruct', 'TestServiceClass', 'TestServiceImpl', 'TestInfiniteScroll', 'TestPager', 'TestPagination', 'TestCustomTableName'];

    function TestManyToOneDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TestManyToOne, TestEntity, TestMapstruct, TestServiceClass, TestServiceImpl, TestInfiniteScroll, TestPager, TestPagination, TestCustomTableName) {
        var vm = this;

        vm.testManyToOne = entity;
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
            if (vm.testManyToOne.id !== null) {
                TestManyToOne.update(vm.testManyToOne, onSaveSuccess, onSaveError);
            } else {
                TestManyToOne.save(vm.testManyToOne, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testManyToOneUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
