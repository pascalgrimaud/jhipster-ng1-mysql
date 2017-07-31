(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('OperationDetailController', OperationDetailController);

    OperationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Operation', 'BankAccount', 'Label'];

    function OperationDetailController($scope, $rootScope, $stateParams, previousState, entity, Operation, BankAccount, Label) {
        var vm = this;

        vm.operation = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('travisMysqlApp:operationUpdate', function(event, result) {
            vm.operation = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
