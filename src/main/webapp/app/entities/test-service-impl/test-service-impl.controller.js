(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestServiceImplController', TestServiceImplController);

    TestServiceImplController.$inject = ['TestServiceImpl'];

    function TestServiceImplController(TestServiceImpl) {

        var vm = this;

        vm.testServiceImpls = [];

        loadAll();

        function loadAll() {
            TestServiceImpl.query(function(result) {
                vm.testServiceImpls = result;
                vm.searchQuery = null;
            });
        }
    }
})();
