(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithPaginationDetailController', EntityWithPaginationDetailController);

    EntityWithPaginationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithPagination'];

    function EntityWithPaginationDetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithPagination) {
        var vm = this;

        vm.entityWithPagination = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithPaginationUpdate', function(event, result) {
            vm.entityWithPagination = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
