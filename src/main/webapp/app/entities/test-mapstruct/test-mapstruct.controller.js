(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestMapstructController', TestMapstructController);

    TestMapstructController.$inject = ['TestMapstruct'];

    function TestMapstructController(TestMapstruct) {

        var vm = this;

        vm.testMapstructs = [];

        loadAll();

        function loadAll() {
            TestMapstruct.query(function(result) {
                vm.testMapstructs = result;
                vm.searchQuery = null;
            });
        }
    }
})();
