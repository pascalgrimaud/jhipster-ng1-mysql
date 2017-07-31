(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestOneToOneDetailController', TestOneToOneDetailController);

    TestOneToOneDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestOneToOne', 'TestEntity', 'TestMapstruct', 'TestServiceClass', 'TestServiceImpl', 'TestInfiniteScroll', 'TestPager', 'TestPagination', 'TestCustomTableName'];

    function TestOneToOneDetailController($scope, $rootScope, $stateParams, previousState, entity, TestOneToOne, TestEntity, TestMapstruct, TestServiceClass, TestServiceImpl, TestInfiniteScroll, TestPager, TestPagination, TestCustomTableName) {
        var vm = this;

        vm.testOneToOne = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testOneToOneUpdate', function(event, result) {
            vm.testOneToOne = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
