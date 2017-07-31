(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestMapstructEntityController', FieldTestMapstructEntityController);

    FieldTestMapstructEntityController.$inject = ['DataUtils', 'FieldTestMapstructEntity'];

    function FieldTestMapstructEntityController(DataUtils, FieldTestMapstructEntity) {

        var vm = this;

        vm.fieldTestMapstructEntities = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            FieldTestMapstructEntity.query(function(result) {
                vm.fieldTestMapstructEntities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
