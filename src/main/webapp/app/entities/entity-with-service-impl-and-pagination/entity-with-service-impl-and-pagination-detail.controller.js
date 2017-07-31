(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndPaginationDetailController', EntityWithServiceImplAndPaginationDetailController);

    EntityWithServiceImplAndPaginationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceImplAndPagination'];

    function EntityWithServiceImplAndPaginationDetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceImplAndPagination) {
        var vm = this;

        vm.entityWithServiceImplAndPagination = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceImplAndPaginationUpdate', function(event, result) {
            vm.entityWithServiceImplAndPagination = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
