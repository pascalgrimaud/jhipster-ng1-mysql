(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('TestTwoRelationshipsSameEntityController', TestTwoRelationshipsSameEntityController);

    TestTwoRelationshipsSameEntityController.$inject = ['TestTwoRelationshipsSameEntity'];

    function TestTwoRelationshipsSameEntityController(TestTwoRelationshipsSameEntity) {

        var vm = this;

        vm.testTwoRelationshipsSameEntities = [];

        loadAll();

        function loadAll() {
            TestTwoRelationshipsSameEntity.query(function(result) {
                vm.testTwoRelationshipsSameEntities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
