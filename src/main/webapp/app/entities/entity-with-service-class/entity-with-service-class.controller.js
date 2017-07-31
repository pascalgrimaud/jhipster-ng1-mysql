(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassController', EntityWithServiceClassController);

    EntityWithServiceClassController.$inject = ['EntityWithServiceClass'];

    function EntityWithServiceClassController(EntityWithServiceClass) {

        var vm = this;

        vm.entityWithServiceClasses = [];

        loadAll();

        function loadAll() {
            EntityWithServiceClass.query(function(result) {
                vm.entityWithServiceClasses = result;
                vm.searchQuery = null;
            });
        }
    }
})();
