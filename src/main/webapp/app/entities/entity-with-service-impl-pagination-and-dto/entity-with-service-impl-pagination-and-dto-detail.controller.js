(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplPaginationAndDTODetailController', EntityWithServiceImplPaginationAndDTODetailController);

    EntityWithServiceImplPaginationAndDTODetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceImplPaginationAndDTO'];

    function EntityWithServiceImplPaginationAndDTODetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceImplPaginationAndDTO) {
        var vm = this;

        vm.entityWithServiceImplPaginationAndDTO = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceImplPaginationAndDTOUpdate', function(event, result) {
            vm.entityWithServiceImplPaginationAndDTO = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
