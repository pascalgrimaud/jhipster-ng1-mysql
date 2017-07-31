(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('EntityWithServiceImplController', EntityWithServiceImplController);

    EntityWithServiceImplController.$inject = ['EntityWithServiceImpl'];

    function EntityWithServiceImplController(EntityWithServiceImpl) {

        var vm = this;

        vm.entityWithServiceImpls = [];

        loadAll();

        function loadAll() {
            EntityWithServiceImpl.query(function(result) {
                vm.entityWithServiceImpls = result;
                vm.searchQuery = null;
            });
        }
    }
})();
