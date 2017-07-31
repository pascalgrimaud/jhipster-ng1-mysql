(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestMapstructEntityDetailController', FieldTestMapstructEntityDetailController);

    FieldTestMapstructEntityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FieldTestMapstructEntity'];

    function FieldTestMapstructEntityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FieldTestMapstructEntity) {
        var vm = this;

        vm.fieldTestMapstructEntity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('travisMysqlApp:fieldTestMapstructEntityUpdate', function(event, result) {
            vm.fieldTestMapstructEntity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
