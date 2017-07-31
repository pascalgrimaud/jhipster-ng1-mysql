(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-pagination', {
            parent: 'entity',
            url: '/test-pagination?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testPagination.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-pagination/test-paginations.html',
                    controller: 'TestPaginationController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testPagination');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-pagination-detail', {
            parent: 'test-pagination',
            url: '/test-pagination/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testPagination.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-pagination/test-pagination-detail.html',
                    controller: 'TestPaginationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testPagination');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestPagination', function($stateParams, TestPagination) {
                    return TestPagination.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-pagination',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-pagination-detail.edit', {
            parent: 'test-pagination-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-pagination/test-pagination-dialog.html',
                    controller: 'TestPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestPagination', function(TestPagination) {
                            return TestPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-pagination.new', {
            parent: 'test-pagination',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-pagination/test-pagination-dialog.html',
                    controller: 'TestPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('test-pagination', null, { reload: 'test-pagination' });
                }, function() {
                    $state.go('test-pagination');
                });
            }]
        })
        .state('test-pagination.edit', {
            parent: 'test-pagination',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-pagination/test-pagination-dialog.html',
                    controller: 'TestPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestPagination', function(TestPagination) {
                            return TestPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-pagination', null, { reload: 'test-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-pagination.delete', {
            parent: 'test-pagination',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-pagination/test-pagination-delete-dialog.html',
                    controller: 'TestPaginationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestPagination', function(TestPagination) {
                            return TestPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-pagination', null, { reload: 'test-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
