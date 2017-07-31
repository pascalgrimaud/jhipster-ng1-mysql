(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-impl-and-pagination', {
            parent: 'entity',
            url: '/entity-with-service-impl-and-pagination?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImplAndPagination.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-paginations.html',
                    controller: 'EntityWithServiceImplAndPaginationController',
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
                    $translatePartialLoader.addPart('entityWithServiceImplAndPagination');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-impl-and-pagination-detail', {
            parent: 'entity-with-service-impl-and-pagination',
            url: '/entity-with-service-impl-and-pagination/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImplAndPagination.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-detail.html',
                    controller: 'EntityWithServiceImplAndPaginationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceImplAndPagination');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceImplAndPagination', function($stateParams, EntityWithServiceImplAndPagination) {
                    return EntityWithServiceImplAndPagination.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-impl-and-pagination',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-impl-and-pagination-detail.edit', {
            parent: 'entity-with-service-impl-and-pagination-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-dialog.html',
                    controller: 'EntityWithServiceImplAndPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImplAndPagination', function(EntityWithServiceImplAndPagination) {
                            return EntityWithServiceImplAndPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl-and-pagination.new', {
            parent: 'entity-with-service-impl-and-pagination',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-dialog.html',
                    controller: 'EntityWithServiceImplAndPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                hugo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-and-pagination', null, { reload: 'entity-with-service-impl-and-pagination' });
                }, function() {
                    $state.go('entity-with-service-impl-and-pagination');
                });
            }]
        })
        .state('entity-with-service-impl-and-pagination.edit', {
            parent: 'entity-with-service-impl-and-pagination',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-dialog.html',
                    controller: 'EntityWithServiceImplAndPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImplAndPagination', function(EntityWithServiceImplAndPagination) {
                            return EntityWithServiceImplAndPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-and-pagination', null, { reload: 'entity-with-service-impl-and-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl-and-pagination.delete', {
            parent: 'entity-with-service-impl-and-pagination',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-delete-dialog.html',
                    controller: 'EntityWithServiceImplAndPaginationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceImplAndPagination', function(EntityWithServiceImplAndPagination) {
                            return EntityWithServiceImplAndPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-and-pagination', null, { reload: 'entity-with-service-impl-and-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
