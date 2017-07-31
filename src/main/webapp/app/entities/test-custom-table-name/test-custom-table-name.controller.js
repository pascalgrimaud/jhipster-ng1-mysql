(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestCustomTableNameController', TestCustomTableNameController);

    TestCustomTableNameController.$inject = ['TestCustomTableName'];

    function TestCustomTableNameController(TestCustomTableName) {

        var vm = this;

        vm.testCustomTableNames = [];

        loadAll();

        function loadAll() {
            TestCustomTableName.query(function(result) {
                vm.testCustomTableNames = result;
                vm.searchQuery = null;
            });
        }
    }
})();
