(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndDTODetailController', EntityWithServiceClassAndDTODetailController);

    EntityWithServiceClassAndDTODetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceClassAndDTO'];

    function EntityWithServiceClassAndDTODetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceClassAndDTO) {
        var vm = this;

        vm.entityWithServiceClassAndDTO = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceClassAndDTOUpdate', function(event, result) {
            vm.entityWithServiceClassAndDTO = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
