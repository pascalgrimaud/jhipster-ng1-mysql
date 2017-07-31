(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestEntityController', TestEntityController);

    TestEntityController.$inject = ['TestEntity'];

    function TestEntityController(TestEntity) {

        var vm = this;

        vm.testEntities = [];

        loadAll();

        function loadAll() {
            TestEntity.query(function(result) {
                vm.testEntities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
