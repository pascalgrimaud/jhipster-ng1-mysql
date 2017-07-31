(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplDetailController', EntityWithServiceImplDetailController);

    EntityWithServiceImplDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceImpl'];

    function EntityWithServiceImplDetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceImpl) {
        var vm = this;

        vm.entityWithServiceImpl = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceImplUpdate', function(event, result) {
            vm.entityWithServiceImpl = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
