(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestMapstructDetailController', TestMapstructDetailController);

    TestMapstructDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestMapstruct', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestMapstructDetailController($scope, $rootScope, $stateParams, previousState, entity, TestMapstruct, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testMapstruct = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testMapstructUpdate', function(event, result) {
            vm.testMapstruct = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
