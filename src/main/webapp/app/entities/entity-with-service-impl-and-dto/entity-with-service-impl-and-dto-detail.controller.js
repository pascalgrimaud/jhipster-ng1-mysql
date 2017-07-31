(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndDTODetailController', EntityWithServiceImplAndDTODetailController);

    EntityWithServiceImplAndDTODetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceImplAndDTO'];

    function EntityWithServiceImplAndDTODetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceImplAndDTO) {
        var vm = this;

        vm.entityWithServiceImplAndDTO = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceImplAndDTOUpdate', function(event, result) {
            vm.entityWithServiceImplAndDTO = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
