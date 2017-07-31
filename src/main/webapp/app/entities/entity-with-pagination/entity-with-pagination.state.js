(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-pagination', {
            parent: 'entity',
            url: '/entity-with-pagination?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithPagination.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-pagination/entity-with-paginations.html',
                    controller: 'EntityWithPaginationController',
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
                    $translatePartialLoader.addPart('entityWithPagination');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-pagination-detail', {
            parent: 'entity-with-pagination',
            url: '/entity-with-pagination/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithPagination.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-pagination/entity-with-pagination-detail.html',
                    controller: 'EntityWithPaginationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithPagination');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithPagination', function($stateParams, EntityWithPagination) {
                    return EntityWithPagination.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-pagination',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-pagination-detail.edit', {
            parent: 'entity-with-pagination-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination/entity-with-pagination-dialog.html',
                    controller: 'EntityWithPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithPagination', function(EntityWithPagination) {
                            return EntityWithPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-pagination.new', {
            parent: 'entity-with-pagination',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination/entity-with-pagination-dialog.html',
                    controller: 'EntityWithPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nathan: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-pagination', null, { reload: 'entity-with-pagination' });
                }, function() {
                    $state.go('entity-with-pagination');
                });
            }]
        })
        .state('entity-with-pagination.edit', {
            parent: 'entity-with-pagination',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination/entity-with-pagination-dialog.html',
                    controller: 'EntityWithPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithPagination', function(EntityWithPagination) {
                            return EntityWithPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-pagination', null, { reload: 'entity-with-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-pagination.delete', {
            parent: 'entity-with-pagination',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination/entity-with-pagination-delete-dialog.html',
                    controller: 'EntityWithPaginationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithPagination', function(EntityWithPagination) {
                            return EntityWithPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-pagination', null, { reload: 'entity-with-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
