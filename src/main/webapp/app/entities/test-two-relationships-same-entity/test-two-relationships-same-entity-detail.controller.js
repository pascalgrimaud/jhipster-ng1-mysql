(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestTwoRelationshipsSameEntityDetailController', TestTwoRelationshipsSameEntityDetailController);

    TestTwoRelationshipsSameEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TestTwoRelationshipsSameEntity', 'TestEntity', 'User'];

    function TestTwoRelationshipsSameEntityDetailController($scope, $rootScope, $stateParams, previousState, entity, TestTwoRelationshipsSameEntity, TestEntity, User) {
        var vm = this;

        vm.testTwoRelationshipsSameEntity = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:testTwoRelationshipsSameEntityUpdate', function(event, result) {
            vm.testTwoRelationshipsSameEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
