(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceClassDetailController', TestServiceClassDetailController);

    TestServiceClassDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestServiceClass', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestServiceClassDetailController($scope, $rootScope, $stateParams, previousState, entity, TestServiceClass, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testServiceClass = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testServiceClassUpdate', function(event, result) {
            vm.testServiceClass = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
