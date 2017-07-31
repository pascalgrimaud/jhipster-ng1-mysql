(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entity-with-service-class', {
            parent: 'entity',
            url: '/entity-with-service-class',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceClass.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-class/entity-with-service-classes.html',
                    controller: 'EntityWithServiceClassController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entity-with-service-class-detail', {
            parent: 'entity-with-service-class',
            url: '/entity-with-service-class/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.entityWithServiceClass.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entity-with-service-class/entity-with-service-class-detail.html',
                    controller: 'EntityWithServiceClassDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entityWithServiceClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntityWithServiceClass', function($stateParams, EntityWithServiceClass) {
                    return EntityWithServiceClass.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entity-with-service-class',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entity-with-service-class-detail.edit', {
            parent: 'entity-with-service-class-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class/entity-with-service-class-dialog.html',
                    controller: 'EntityWithServiceClassDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceClass', function(EntityWithServiceClass) {
                            return EntityWithServiceClass.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-class.new', {
            parent: 'entity-with-service-class',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class/entity-with-service-class-dialog.html',
                    controller: 'EntityWithServiceClassDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                zoe: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class', null, { reload: 'entity-with-service-class' });
                }, function() {
                    $state.go('entity-with-service-class');
                });
            }]
        })
        .state('entity-with-service-class.edit', {
            parent: 'entity-with-service-class',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class/entity-with-service-class-dialog.html',
                    controller: 'EntityWithServiceClassDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntityWithServiceClass', function(EntityWithServiceClass) {
                            return EntityWithServiceClass.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class', null, { reload: 'entity-with-service-class' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entity-with-service-class.delete', {
            parent: 'entity-with-service-class',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entity-with-service-class/entity-with-service-class-delete-dialog.html',
                    controller: 'EntityWithServiceClassDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntityWithServiceClass', function(EntityWithServiceClass) {
                            return EntityWithServiceClass.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entity-with-service-class', null, { reload: 'entity-with-service-class' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
