(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceImplEntityController', FieldTestServiceImplEntityController);

    FieldTestServiceImplEntityController.$inject = ['DataUtils', 'FieldTestServiceImplEntity'];

    function FieldTestServiceImplEntityController(DataUtils, FieldTestServiceImplEntity) {

        var vm = this;

        vm.fieldTestServiceImplEntities = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            FieldTestServiceImplEntity.query(function(result) {
                vm.fieldTestServiceImplEntities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
