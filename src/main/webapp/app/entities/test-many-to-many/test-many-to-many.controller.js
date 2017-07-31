(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestManyToManyController', TestManyToManyController);

    TestManyToManyController.$inject = ['TestManyToMany'];

    function TestManyToManyController(TestManyToMany) {

        var vm = this;

        vm.testManyToManies = [];

        loadAll();

        function loadAll() {
            TestManyToMany.query(function(result) {
                vm.testManyToManies = result;
                vm.searchQuery = null;
            });
        }
    }
})();
