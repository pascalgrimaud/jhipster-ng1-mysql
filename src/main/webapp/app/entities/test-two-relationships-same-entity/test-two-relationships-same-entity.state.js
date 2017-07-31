(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-two-relationships-same-entity', {
            parent: 'entity',
            url: '/test-two-relationships-same-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testTwoRelationshipsSameEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-two-relationships-same-entity/test-two-relationships-same-entities.html',
                    controller: 'TestTwoRelationshipsSameEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testTwoRelationshipsSameEntity');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-two-relationships-same-entity-detail', {
            parent: 'test-two-relationships-same-entity',
            url: '/test-two-relationships-same-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testTwoRelationshipsSameEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-two-relationships-same-entity/test-two-relationships-same-entity-detail.html',
                    controller: 'TestTwoRelationshipsSameEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testTwoRelationshipsSameEntity');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestTwoRelationshipsSameEntity', function($stateParams, TestTwoRelationshipsSameEntity) {
                    return TestTwoRelationshipsSameEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-two-relationships-same-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-two-relationships-same-entity-detail.edit', {
            parent: 'test-two-relationships-same-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-two-relationships-same-entity/test-two-relationships-same-entity-dialog.html',
                    controller: 'TestTwoRelationshipsSameEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestTwoRelationshipsSameEntity', function(TestTwoRelationshipsSameEntity) {
                            return TestTwoRelationshipsSameEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-two-relationships-same-entity.new', {
            parent: 'test-two-relationships-same-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-two-relationships-same-entity/test-two-relationships-same-entity-dialog.html',
                    controller: 'TestTwoRelationshipsSameEntityDialogController',
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
                    $state.go('test-two-relationships-same-entity', null, { reload: 'test-two-relationships-same-entity' });
                }, function() {
                    $state.go('test-two-relationships-same-entity');
                });
            }]
        })
        .state('test-two-relationships-same-entity.edit', {
            parent: 'test-two-relationships-same-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-two-relationships-same-entity/test-two-relationships-same-entity-dialog.html',
                    controller: 'TestTwoRelationshipsSameEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestTwoRelationshipsSameEntity', function(TestTwoRelationshipsSameEntity) {
                            return TestTwoRelationshipsSameEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-two-relationships-same-entity', null, { reload: 'test-two-relationships-same-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-two-relationships-same-entity.delete', {
            parent: 'test-two-relationships-same-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-two-relationships-same-entity/test-two-relationships-same-entity-delete-dialog.html',
                    controller: 'TestTwoRelationshipsSameEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestTwoRelationshipsSameEntity', function(TestTwoRelationshipsSameEntity) {
                            return TestTwoRelationshipsSameEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-two-relationships-same-entity', null, { reload: 'test-two-relationships-same-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
