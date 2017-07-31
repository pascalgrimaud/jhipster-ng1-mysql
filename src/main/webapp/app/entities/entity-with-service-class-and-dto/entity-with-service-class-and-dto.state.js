(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-class-and-dto', {
            parent: 'entity',
            url: '/entity-with-service-class-and-dto',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceClassAndDTO.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dtos.html',
                    controller: 'EntityWithServiceClassAndDTOController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceClassAndDTO');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-class-and-dto-detail', {
            parent: 'entity-with-service-class-and-dto',
            url: '/entity-with-service-class-and-dto/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceClassAndDTO.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-detail.html',
                    controller: 'EntityWithServiceClassAndDTODetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceClassAndDTO');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceClassAndDTO', function($stateParams, EntityWithServiceClassAndDTO) {
                    return EntityWithServiceClassAndDTO.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-class-and-dto',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-class-and-dto-detail.edit', {
            parent: 'entity-with-service-class-and-dto-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-dialog.html',
                    controller: 'EntityWithServiceClassAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceClassAndDTO', function(EntityWithServiceClassAndDTO) {
                            return EntityWithServiceClassAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-class-and-dto.new', {
            parent: 'entity-with-service-class-and-dto',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-dialog.html',
                    controller: 'EntityWithServiceClassAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                lucas: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class-and-dto', null, { reload: 'entity-with-service-class-and-dto' });
                }, function() {
                    $state.go('entity-with-service-class-and-dto');
                });
            }]
        })
        .state('entity-with-service-class-and-dto.edit', {
            parent: 'entity-with-service-class-and-dto',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-dialog.html',
                    controller: 'EntityWithServiceClassAndDTODialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceClassAndDTO', function(EntityWithServiceClassAndDTO) {
                            return EntityWithServiceClassAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class-and-dto', null, { reload: 'entity-with-service-class-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-class-and-dto.delete', {
            parent: 'entity-with-service-class-and-dto',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-delete-dialog.html',
                    controller: 'EntityWithServiceClassAndDTODeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceClassAndDTO', function(EntityWithServiceClassAndDTO) {
                            return EntityWithServiceClassAndDTO.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class-and-dto', null, { reload: 'entity-with-service-class-and-dto' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
