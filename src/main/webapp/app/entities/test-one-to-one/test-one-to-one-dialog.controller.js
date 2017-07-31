(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestOneToOneDialogController', TestOneToOneDialogController);

    TestOneToOneDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestOneToOne', 'TestEntity', 'TestMapstruct', 'TestServiceClass', 'TestServiceImpl', 'TestInfiniteScroll', 'TestPager', 'TestPagination', 'TestCustomTableName'];

    function TestOneToOneDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestOneToOne, TestEntity, TestMapstruct, TestServiceClass, TestServiceImpl, TestInfiniteScroll, TestPager, TestPagination, TestCustomTableName) {
        var vm = this;

        vm.testOneToOne = entity;
        vm.clear = clear;
        vm.save = save;
        vm.testentities = TestEntity.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testentities.$promise]).then(function() {
            if (!vm.testOneToOne.testEntity || !vm.testOneToOne.testEntity.id) {
                return $q.reject();
            }
            return TestEntity.get({id : vm.testOneToOne.testEntity.id}).$promise;
        }).then(function(testEntity) {
            vm.testentities.push(testEntity);
        });
        vm.testmapstructs = TestMapstruct.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testmapstructs.$promise]).then(function() {
            if (!vm.testOneToOne.testMapstruct || !vm.testOneToOne.testMapstruct.id) {
                return $q.reject();
            }
            return TestMapstruct.get({id : vm.testOneToOne.testMapstruct.id}).$promise;
        }).then(function(testMapstruct) {
            vm.testmapstructs.push(testMapstruct);
        });
        vm.testserviceclasses = TestServiceClass.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testserviceclasses.$promise]).then(function() {
            if (!vm.testOneToOne.testServiceClass || !vm.testOneToOne.testServiceClass.id) {
                return $q.reject();
            }
            return TestServiceClass.get({id : vm.testOneToOne.testServiceClass.id}).$promise;
        }).then(function(testServiceClass) {
            vm.testserviceclasses.push(testServiceClass);
        });
        vm.testserviceimpls = TestServiceImpl.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testserviceimpls.$promise]).then(function() {
            if (!vm.testOneToOne.testServiceImpl || !vm.testOneToOne.testServiceImpl.id) {
                return $q.reject();
            }
            return TestServiceImpl.get({id : vm.testOneToOne.testServiceImpl.id}).$promise;
        }).then(function(testServiceImpl) {
            vm.testserviceimpls.push(testServiceImpl);
        });
        vm.testinfinitescrolls = TestInfiniteScroll.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testinfinitescrolls.$promise]).then(function() {
            if (!vm.testOneToOne.testInfiniteScroll || !vm.testOneToOne.testInfiniteScroll.id) {
                return $q.reject();
            }
            return TestInfiniteScroll.get({id : vm.testOneToOne.testInfiniteScroll.id}).$promise;
        }).then(function(testInfiniteScroll) {
            vm.testinfinitescrolls.push(testInfiniteScroll);
        });
        vm.testpagers = TestPager.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testpagers.$promise]).then(function() {
            if (!vm.testOneToOne.testPager || !vm.testOneToOne.testPager.id) {
                return $q.reject();
            }
            return TestPager.get({id : vm.testOneToOne.testPager.id}).$promise;
        }).then(function(testPager) {
            vm.testpagers.push(testPager);
        });
        vm.testpaginations = TestPagination.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testpaginations.$promise]).then(function() {
            if (!vm.testOneToOne.testPagination || !vm.testOneToOne.testPagination.id) {
                return $q.reject();
            }
            return TestPagination.get({id : vm.testOneToOne.testPagination.id}).$promise;
        }).then(function(testPagination) {
            vm.testpaginations.push(testPagination);
        });
        vm.testcustomtablenames = TestCustomTableName.query({filter: 'testonetoone-is-null'});
        $q.all([vm.testOneToOne.$promise, vm.testcustomtablenames.$promise]).then(function() {
            if (!vm.testOneToOne.testCustomTableName || !vm.testOneToOne.testCustomTableName.id) {
                return $q.reject();
            }
            return TestCustomTableName.get({id : vm.testOneToOne.testCustomTableName.id}).$promise;
        }).then(function(testCustomTableName) {
            vm.testcustomtablenames.push(testCustomTableName);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.testOneToOne.id !== null) {
                TestOneToOne.update(vm.testOneToOne, onSaveSuccess, onSaveError);
            } else {
                TestOneToOne.save(vm.testOneToOne, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testOneToOneUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
