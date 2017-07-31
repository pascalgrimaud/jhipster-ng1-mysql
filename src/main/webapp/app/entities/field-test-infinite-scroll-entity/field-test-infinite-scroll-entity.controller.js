(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestInfiniteScrollEntityController', FieldTestInfiniteScrollEntityController);

    FieldTestInfiniteScrollEntityController.$inject = ['DataUtils', 'FieldTestInfiniteScrollEntity', 'ParseLinks', 'AlertService', 'paginationConstants'];

    function FieldTestInfiniteScrollEntityController(DataUtils, FieldTestInfiniteScrollEntity, ParseLinks, AlertService, paginationConstants) {

        var vm = this;

        vm.fieldTestInfiniteScrollEntities = [];
        vm.loadPage = loadPage;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll () {
            FieldTestInfiniteScrollEntity.query({
                page: vm.page,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.fieldTestInfiniteScrollEntities.push(data[i]);
                }
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function reset () {
            vm.page = 0;
            vm.fieldTestInfiniteScrollEntities = [];
            loadAll();
        }

        function loadPage(page) {
            vm.page = page;
            loadAll();
        }
    }
})();
