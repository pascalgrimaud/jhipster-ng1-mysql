(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestInfiniteScrollDetailController', TestInfiniteScrollDetailController);

    TestInfiniteScrollDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestInfiniteScroll', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestInfiniteScrollDetailController($scope, $rootScope, $stateParams, previousState, entity, TestInfiniteScroll, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testInfiniteScroll = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testInfiniteScrollUpdate', function(event, result) {
            vm.testInfiniteScroll = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
