(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceClassController', TestServiceClassController);

    TestServiceClassController.$inject = ['TestServiceClass'];

    function TestServiceClassController(TestServiceClass) {

        var vm = this;

        vm.testServiceClasses = [];

        loadAll();

        function loadAll() {
            TestServiceClass.query(function(result) {
                vm.testServiceClasses = result;
                vm.searchQuery = null;
            });
        }
    }
})();
