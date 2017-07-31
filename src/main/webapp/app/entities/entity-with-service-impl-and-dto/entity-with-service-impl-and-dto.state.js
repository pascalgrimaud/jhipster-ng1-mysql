(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-impl-and-dto', {
            parent: 'entity',
            url: '/entity-with-service-impl-and-dto',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImplAndDTO.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dtos.html',
                    controller: 'EntityWithServiceImplAndDTOController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceImplAndDTO');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-impl-and-dto-detail', {
            parent: 'entity-with-service-impl-and-dto',
            url: '/entity-with-service-impl-and-dto/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImplAndDTO.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-detail.html',
                    controller: 'EntityWithServiceImplAndDTODetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceImplAndDTO');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceImplAndDTO', function($stateParams, EntityWithServiceImplAndDTO) {
                    return EntityWithServiceImplAndDTO.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-impl-and-dto',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-impl-and-dto-detail.edit', {
            parent: 'entity-with-service-impl-and-dto-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-dialog.html',
                    controller: 'EntityWithServiceImplAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImplAndDTO', function(EntityWithServiceImplAndDTO) {
                            return EntityWithServiceImplAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl-and-dto.new', {
            parent: 'entity-with-service-impl-and-dto',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-dialog.html',
                    controller: 'EntityWithServiceImplAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                louis: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-and-dto', null, { reload: 'entity-with-service-impl-and-dto' });
                }, function() {
                    $state.go('entity-with-service-impl-and-dto');
                });
            }]
        })
        .state('entity-with-service-impl-and-dto.edit', {
            parent: 'entity-with-service-impl-and-dto',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-dialog.html',
                    controller: 'EntityWithServiceImplAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImplAndDTO', function(EntityWithServiceImplAndDTO) {
                            return EntityWithServiceImplAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-and-dto', null, { reload: 'entity-with-service-impl-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl-and-dto.delete', {
            parent: 'entity-with-service-impl-and-dto',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-delete-dialog.html',
                    controller: 'EntityWithServiceImplAndDTODeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceImplAndDTO', function(EntityWithServiceImplAndDTO) {
                            return EntityWithServiceImplAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl-and-dto', null, { reload: 'entity-with-service-impl-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
