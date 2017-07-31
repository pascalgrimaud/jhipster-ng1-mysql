(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-impl-pagination-and-dto', {
            parent: 'entity',
            url: '/entity-with-service-impl-pagination-and-dto?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImplPaginationAndDTO.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dtos.html',
                    controller: 'EntityWithServiceImplPaginationAndDTOController',
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
                    $translatePartialLoader.addPart('entityWithServiceImplPaginationAndDTO');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-impl-pagination-and-dto-detail', {
            parent: 'entity-with-service-impl-pagination-and-dto',
            url: '/entity-with-service-impl-pagination-and-dto/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImplPaginationAndDTO.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-detail.html',
                    controller: 'EntityWithServiceImplPaginationAndDTODetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceImplPaginationAndDTO');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceImplPaginationAndDTO', function($stateParams, EntityWithServiceImplPaginationAndDTO) {
                    return EntityWithServiceImplPaginationAndDTO.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-impl-pagination-and-dto',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-impl-pagination-and-dto-detail.edit', {
            parent: 'entity-with-service-impl-pagination-and-dto-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-dialog.html',
                    controller: 'EntityWithServiceImplPaginationAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImplPaginationAndDTO', function(EntityWithServiceImplPaginationAndDTO) {
                            return EntityWithServiceImplPaginationAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl-pagination-and-dto.new', {
            parent: 'entity-with-service-impl-pagination-and-dto',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-dialog.html',
                    controller: 'EntityWithServiceImplPaginationAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                theo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-pagination-and-dto', null, { reload: 'entity-with-service-impl-pagination-and-dto' });
                }, function() {
                    $state.go('entity-with-service-impl-pagination-and-dto');
                });
            }]
        })
        .state('entity-with-service-impl-pagination-and-dto.edit', {
            parent: 'entity-with-service-impl-pagination-and-dto',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-dialog.html',
                    controller: 'EntityWithServiceImplPaginationAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImplPaginationAndDTO', function(EntityWithServiceImplPaginationAndDTO) {
                            return EntityWithServiceImplPaginationAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-pagination-and-dto', null, { reload: 'entity-with-service-impl-pagination-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl-pagination-and-dto.delete', {
            parent: 'entity-with-service-impl-pagination-and-dto',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-delete-dialog.html',
                    controller: 'EntityWithServiceImplPaginationAndDTODeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceImplPaginationAndDTO', function(EntityWithServiceImplPaginationAndDTO) {
                            return EntityWithServiceImplPaginationAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-pagination-and-dto', null, { reload: 'entity-with-service-impl-pagination-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
