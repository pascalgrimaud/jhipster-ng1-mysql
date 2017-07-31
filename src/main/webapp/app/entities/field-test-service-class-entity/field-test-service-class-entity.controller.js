(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceClassEntityController', FieldTestServiceClassEntityController);

    FieldTestServiceClassEntityController.$inject = ['DataUtils', 'FieldTestServiceClassEntity'];

    function FieldTestServiceClassEntityController(DataUtils, FieldTestServiceClassEntity) {

        var vm = this;

        vm.fieldTestServiceClassEntities = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            FieldTestServiceClassEntity.query(function(result) {
                vm.fieldTestServiceClassEntities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
