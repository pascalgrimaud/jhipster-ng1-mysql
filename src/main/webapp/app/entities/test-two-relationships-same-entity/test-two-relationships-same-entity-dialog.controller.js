(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestTwoRelationshipsSameEntityDialogController', TestTwoRelationshipsSameEntityDialogController);

    TestTwoRelationshipsSameEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TestTwoRelationshipsSameEntity', 'TestEntity', 'User'];

    function TestTwoRelationshipsSameEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TestTwoRelationshipsSameEntity, TestEntity, User) {
        var vm = this;

        vm.testTwoRelationshipsSameEntity = entity;
        vm.clear = clear;
        vm.save = save;
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
            if (vm.testTwoRelationshipsSameEntity.id !== null) {
                TestTwoRelationshipsSameEntity.update(vm.testTwoRelationshipsSameEntity, onSaveSuccess, onSaveError);
            } else {
                TestTwoRelationshipsSameEntity.save(vm.testTwoRelationshipsSameEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:testTwoRelationshipsSameEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
