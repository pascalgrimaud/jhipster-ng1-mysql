(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithPaginationAndDTODetailController', EntityWithPaginationAndDTODetailController);

    EntityWithPaginationAndDTODetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithPaginationAndDTO'];

    function EntityWithPaginationAndDTODetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithPaginationAndDTO) {
        var vm = this;

        vm.entityWithPaginationAndDTO = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithPaginationAndDTOUpdate', function(event, result) {
            vm.entityWithPaginationAndDTO = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
