(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndPaginationDetailController', EntityWithServiceClassAndPaginationDetailController);

    EntityWithServiceClassAndPaginationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceClassAndPagination'];

    function EntityWithServiceClassAndPaginationDetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceClassAndPagination) {
        var vm = this;

        vm.entityWithServiceClassAndPagination = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceClassAndPaginationUpdate', function(event, result) {
            vm.entityWithServiceClassAndPagination = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
