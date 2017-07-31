(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToManyDetailController', TestManyToManyDetailController);

    TestManyToManyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestManyToMany', 'TestEntity', 'TestMapstruct', 'TestServiceClass', 'TestServiceImpl', 'TestInfiniteScroll', 'TestPager', 'TestPagination', 'TestCustomTableName'];

    function TestManyToManyDetailController($scope, $rootScope, $stateParams, previousState, entity, TestManyToMany, TestEntity, TestMapstruct, TestServiceClass, TestServiceImpl, TestInfiniteScroll, TestPager, TestPagination, TestCustomTableName) {
        var vm = this;

        vm.testManyToMany = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testManyToManyUpdate', function(event, result) {
            vm.testManyToMany = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
