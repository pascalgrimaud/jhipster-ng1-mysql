(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithDTODetailController', EntityWithDTODetailController);

    EntityWithDTODetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithDTO'];

    function EntityWithDTODetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithDTO) {
        var vm = this;

        vm.entityWithDTO = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithDTOUpdate', function(event, result) {
            vm.entityWithDTO = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
