(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-entity', {
            parent: 'entity',
            url: '/test-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-entity/test-entities.html',
                    controller: 'TestEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testEntity');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-entity-detail', {
            parent: 'test-entity',
            url: '/test-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-entity/test-entity-detail.html',
                    controller: 'TestEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testEntity');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestEntity', function($stateParams, TestEntity) {
                    return TestEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-entity-detail.edit', {
            parent: 'test-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-entity/test-entity-dialog.html',
                    controller: 'TestEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestEntity', function(TestEntity) {
                            return TestEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-entity.new', {
            parent: 'test-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-entity/test-entity-dialog.html',
                    controller: 'TestEntityDialogController',
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
                    $state.go('test-entity', null, { reload: 'test-entity' });
                }, function() {
                    $state.go('test-entity');
                });
            }]
        })
        .state('test-entity.edit', {
            parent: 'test-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-entity/test-entity-dialog.html',
                    controller: 'TestEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestEntity', function(TestEntity) {
                            return TestEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-entity', null, { reload: 'test-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-entity.delete', {
            parent: 'test-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-entity/test-entity-delete-dialog.html',
                    controller: 'TestEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestEntity', function(TestEntity) {
                            return TestEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-entity', null, { reload: 'test-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
