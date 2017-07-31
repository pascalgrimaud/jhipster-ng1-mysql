(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestOneToOneController', TestOneToOneController);

    TestOneToOneController.$inject = ['TestOneToOne'];

    function TestOneToOneController(TestOneToOne) {

        var vm = this;

        vm.testOneToOnes = [];

        loadAll();

        function loadAll() {
            TestOneToOne.query(function(result) {
                vm.testOneToOnes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
