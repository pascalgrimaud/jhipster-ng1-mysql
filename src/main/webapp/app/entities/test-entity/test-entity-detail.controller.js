(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestEntityDetailController', TestEntityDetailController);

    TestEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestEntity', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User', 'TestCustomTableName'];

    function TestEntityDetailController($scope, $rootScope, $stateParams, previousState, entity, TestEntity, TestManyToOne, TestManyToMany, TestOneToOne, User, TestCustomTableName) {
        var vm = this;

        vm.testEntity = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testEntityUpdate', function(event, result) {
            vm.testEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
