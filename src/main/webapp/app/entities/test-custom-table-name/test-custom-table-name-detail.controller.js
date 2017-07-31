(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestCustomTableNameDetailController', TestCustomTableNameDetailController);

    TestCustomTableNameDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestCustomTableName', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'TestEntity', 'User'];

    function TestCustomTableNameDetailController($scope, $rootScope, $stateParams, previousState, entity, TestCustomTableName, TestManyToOne, TestManyToMany, TestOneToOne, TestEntity, User) {
        var vm = this;

        vm.testCustomTableName = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testCustomTableNameUpdate', function(event, result) {
            vm.testCustomTableName = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
