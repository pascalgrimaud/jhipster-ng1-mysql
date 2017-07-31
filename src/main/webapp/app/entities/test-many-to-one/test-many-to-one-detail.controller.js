(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToOneDetailController', TestManyToOneDetailController);

    TestManyToOneDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestManyToOne', 'TestEntity', 'TestMapstruct', 'TestServiceClass', 'TestServiceImpl', 'TestInfiniteScroll', 'TestPager', 'TestPagination', 'TestCustomTableName'];

    function TestManyToOneDetailController($scope, $rootScope, $stateParams, previousState, entity, TestManyToOne, TestEntity, TestMapstruct, TestServiceClass, TestServiceImpl, TestInfiniteScroll, TestPager, TestPagination, TestCustomTableName) {
        var vm = this;

        vm.testManyToOne = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testManyToOneUpdate', function(event, result) {
            vm.testManyToOne = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
