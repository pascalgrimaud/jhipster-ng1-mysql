(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceClassAndDTOController', EntityWithServiceClassAndDTOController);

    EntityWithServiceClassAndDTOController.$inject = ['EntityWithServiceClassAndDTO'];

    function EntityWithServiceClassAndDTOController(EntityWithServiceClassAndDTO) {

        var vm = this;

        vm.entityWithServiceClassAndDTOS = [];

        loadAll();

        function loadAll() {
            EntityWithServiceClassAndDTO.query(function(result) {
                vm.entityWithServiceClassAndDTOS = result;
                vm.searchQuery = null;
            });
        }
    }
})();
