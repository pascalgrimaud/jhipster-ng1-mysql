(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceImplDetailController', TestServiceImplDetailController);

    TestServiceImplDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestServiceImpl', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestServiceImplDetailController($scope, $rootScope, $stateParams, previousState, entity, TestServiceImpl, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testServiceImpl = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testServiceImplUpdate', function(event, result) {
            vm.testServiceImpl = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
