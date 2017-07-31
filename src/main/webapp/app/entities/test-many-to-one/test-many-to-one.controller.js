(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToOneController', TestManyToOneController);

    TestManyToOneController.$inject = ['TestManyToOne'];

    function TestManyToOneController(TestManyToOne) {

        var vm = this;

        vm.testManyToOnes = [];

        loadAll();

        function loadAll() {
            TestManyToOne.query(function(result) {
                vm.testManyToOnes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
