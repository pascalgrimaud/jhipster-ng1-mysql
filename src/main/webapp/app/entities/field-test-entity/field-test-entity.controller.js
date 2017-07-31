(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestEntityController', FieldTestEntityController);

    FieldTestEntityController.$inject = ['DataUtils', 'FieldTestEntity'];

    function FieldTestEntityController(DataUtils, FieldTestEntity) {

        var vm = this;

        vm.fieldTestEntities = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            FieldTestEntity.query(function(result) {
                vm.fieldTestEntities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
