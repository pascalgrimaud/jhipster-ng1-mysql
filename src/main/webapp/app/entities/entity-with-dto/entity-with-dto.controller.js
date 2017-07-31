(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithDTOController', EntityWithDTOController);

    EntityWithDTOController.$inject = ['EntityWithDTO'];

    function EntityWithDTOController(EntityWithDTO) {

        var vm = this;

        vm.entityWithDTOS = [];

        loadAll();

        function loadAll() {
            EntityWithDTO.query(function(result) {
                vm.entityWithDTOS = result;
                vm.searchQuery = null;
            });
        }
    }
})();
