(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-pagination-and-dto', {
            parent: 'entity',
            url: '/entity-with-pagination-and-dto?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithPaginationAndDTO.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dtos.html',
                    controller: 'EntityWithPaginationAndDTOController',
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
                    $translatePartialLoader.addPart('entityWithPaginationAndDTO');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-pagination-and-dto-detail', {
            parent: 'entity-with-pagination-and-dto',
            url: '/entity-with-pagination-and-dto/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithPaginationAndDTO.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-detail.html',
                    controller: 'EntityWithPaginationAndDTODetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithPaginationAndDTO');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithPaginationAndDTO', function($stateParams, EntityWithPaginationAndDTO) {
                    return EntityWithPaginationAndDTO.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-pagination-and-dto',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-pagination-and-dto-detail.edit', {
            parent: 'entity-with-pagination-and-dto-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-dialog.html',
                    controller: 'EntityWithPaginationAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithPaginationAndDTO', function(EntityWithPaginationAndDTO) {
                            return EntityWithPaginationAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-pagination-and-dto.new', {
            parent: 'entity-with-pagination-and-dto',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-dialog.html',
                    controller: 'EntityWithPaginationAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                lea: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-pagination-and-dto', null, { reload: 'entity-with-pagination-and-dto' });
                }, function() {
                    $state.go('entity-with-pagination-and-dto');
                });
            }]
        })
        .state('entity-with-pagination-and-dto.edit', {
            parent: 'entity-with-pagination-and-dto',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-dialog.html',
                    controller: 'EntityWithPaginationAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithPaginationAndDTO', function(EntityWithPaginationAndDTO) {
                            return EntityWithPaginationAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-pagination-and-dto', null, { reload: 'entity-with-pagination-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-pagination-and-dto.delete', {
            parent: 'entity-with-pagination-and-dto',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-delete-dialog.html',
                    controller: 'EntityWithPaginationAndDTODeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithPaginationAndDTO', function(EntityWithPaginationAndDTO) {
                            return EntityWithPaginationAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-pagination-and-dto', null, { reload: 'entity-with-pagination-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
