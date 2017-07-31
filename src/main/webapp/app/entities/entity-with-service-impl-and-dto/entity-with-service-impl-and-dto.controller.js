(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplAndDTOController', EntityWithServiceImplAndDTOController);

    EntityWithServiceImplAndDTOController.$inject = ['EntityWithServiceImplAndDTO'];

    function EntityWithServiceImplAndDTOController(EntityWithServiceImplAndDTO) {

        var vm = this;

        vm.entityWithServiceImplAndDTOS = [];

        loadAll();

        function loadAll() {
            EntityWithServiceImplAndDTO.query(function(result) {
                vm.entityWithServiceImplAndDTOS = result;
                vm.searchQuery = null;
            });
        }
    }
})();
