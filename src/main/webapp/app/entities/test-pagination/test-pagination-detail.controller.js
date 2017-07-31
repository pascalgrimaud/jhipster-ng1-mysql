(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestPaginationDetailController', TestPaginationDetailController);

    TestPaginationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestPagination', 'TestManyToOne', 'TestManyToMany', 'TestOneToOne', 'User'];

    function TestPaginationDetailController($scope, $rootScope, $stateParams, previousState, entity, TestPagination, TestManyToOne, TestManyToMany, TestOneToOne, User) {
        var vm = this;

        vm.testPagination = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testPaginationUpdate', function(event, result) {
            vm.testPagination = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
