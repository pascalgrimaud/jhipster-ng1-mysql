(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestPagerDetailController', TestPagerDetailController);

    TestPagerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestPager', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestPagerDetailController($scope, $rootScope, $stateParams, previousState, entity, TestPager, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testPager = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testPagerUpdate', function(event, result) {
            vm.testPager = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
