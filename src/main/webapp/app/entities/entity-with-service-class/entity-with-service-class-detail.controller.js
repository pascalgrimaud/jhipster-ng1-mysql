(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassDetailController', EntityWithServiceClassDetailController);

    EntityWithServiceClassDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntityWithServiceClass'];

    function EntityWithServiceClassDetailController($scope, $rootScope, $stateParams, previousState, entity, EntityWithServiceClass) {
        var vm = this;

        vm.entityWithServiceClass = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:entityWithServiceClassUpdate', function(event, result) {
            vm.entityWithServiceClass = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
