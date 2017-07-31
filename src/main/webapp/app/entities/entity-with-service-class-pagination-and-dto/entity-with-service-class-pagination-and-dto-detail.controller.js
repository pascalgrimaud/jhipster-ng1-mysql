(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassPaginationAndDTODetailController', EntityWithServiceClassPaginationAndDTODetailController);

    EntityWithServiceClassPaginationAndDTODetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceClassPaginationAndDTO'];

    function EntityWithServiceClassPaginationAndDTODetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceClassPaginationAndDTO) {
        var vm = this;

        vm.entityWithServiceClassPaginationAndDTO = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceClassPaginationAndDTOUpdate', function(event, result) {
            vm.entityWithServiceClassPaginationAndDTO = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
