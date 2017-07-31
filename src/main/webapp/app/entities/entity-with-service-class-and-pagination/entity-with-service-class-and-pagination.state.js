(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-class-and-pagination', {
            parent: 'entity',
            url: '/entity-with-service-class-and-pagination?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceClassAndPagination.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-paginations.html',
                    controller: 'EntityWithServiceClassAndPaginationController',
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
                    $translatePartialLoader.addPart('entityWithServiceClassAndPagination');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-class-and-pagination-detail', {
            parent: 'entity-with-service-class-and-pagination',
            url: '/entity-with-service-class-and-pagination/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceClassAndPagination.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-detail.html',
                    controller: 'EntityWithServiceClassAndPaginationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceClassAndPagination');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceClassAndPagination', function($stateParams, EntityWithServiceClassAndPagination) {
                    return EntityWithServiceClassAndPagination.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-class-and-pagination',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-class-and-pagination-detail.edit', {
            parent: 'entity-with-service-class-and-pagination-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-dialog.html',
                    controller: 'EntityWithServiceClassAndPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceClassAndPagination', function(EntityWithServiceClassAndPagination) {
                            return EntityWithServiceClassAndPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-class-and-pagination.new', {
            parent: 'entity-with-service-class-and-pagination',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-dialog.html',
                    controller: 'EntityWithServiceClassAndPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                enzo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class-and-pagination', null, { reload: 'entity-with-service-class-and-pagination' });
                }, function() {
                    $state.go('entity-with-service-class-and-pagination');
                });
            }]
        })
        .state('entity-with-service-class-and-pagination.edit', {
            parent: 'entity-with-service-class-and-pagination',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-dialog.html',
                    controller: 'EntityWithServiceClassAndPaginationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceClassAndPagination', function(EntityWithServiceClassAndPagination) {
                            return EntityWithServiceClassAndPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class-and-pagination', null, { reload: 'entity-with-service-class-and-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-class-and-pagination.delete', {
            parent: 'entity-with-service-class-and-pagination',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-delete-dialog.html',
                    controller: 'EntityWithServiceClassAndPaginationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceClassAndPagination', function(EntityWithServiceClassAndPagination) {
                            return EntityWithServiceClassAndPagination.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class-and-pagination', null, { reload: 'entity-with-service-class-and-pagination' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
