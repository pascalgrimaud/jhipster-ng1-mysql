(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-impl', {
            parent: 'entity',
            url: '/entity-with-service-impl',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImpl.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl/entity-with-service-impls.html',
                    controller: 'EntityWithServiceImplController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceImpl');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-impl-detail', {
            parent: 'entity-with-service-impl',
            url: '/entity-with-service-impl/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceImpl.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-impl/entity-with-service-impl-detail.html',
                    controller: 'EntityWithServiceImplDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceImpl');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceImpl', function($stateParams, EntityWithServiceImpl) {
                    return EntityWithServiceImpl.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-impl',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-impl-detail.edit', {
            parent: 'entity-with-service-impl-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl/entity-with-service-impl-dialog.html',
                    controller: 'EntityWithServiceImplDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImpl', function(EntityWithServiceImpl) {
                            return EntityWithServiceImpl.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl.new', {
            parent: 'entity-with-service-impl',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl/entity-with-service-impl-dialog.html',
                    controller: 'EntityWithServiceImplDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                clara: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl', null, { reload: 'entity-with-service-impl' });
                }, function() {
                    $state.go('entity-with-service-impl');
                });
            }]
        })
        .state('entity-with-service-impl.edit', {
            parent: 'entity-with-service-impl',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl/entity-with-service-impl-dialog.html',
                    controller: 'EntityWithServiceImplDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceImpl', function(EntityWithServiceImpl) {
                            return EntityWithServiceImpl.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl', null, { reload: 'entity-with-service-impl' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-impl.delete', {
            parent: 'entity-with-service-impl',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-impl/entity-with-service-impl-delete-dialog.html',
                    controller: 'EntityWithServiceImplDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceImpl', function(EntityWithServiceImpl) {
                            return EntityWithServiceImpl.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-impl', null, { reload: 'entity-with-service-impl' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
