(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-service-impl', {
            parent: 'entity',
            url: '/test-service-impl',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testServiceImpl.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-service-impl/test-service-impls.html',
                    controller: 'TestServiceImplController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testServiceImpl');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-service-impl-detail', {
            parent: 'test-service-impl',
            url: '/test-service-impl/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testServiceImpl.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-service-impl/test-service-impl-detail.html',
                    controller: 'TestServiceImplDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testServiceImpl');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestServiceImpl', function($stateParams, TestServiceImpl) {
                    return TestServiceImpl.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-service-impl',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-service-impl-detail.edit', {
            parent: 'test-service-impl-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-impl/test-service-impl-dialog.html',
                    controller: 'TestServiceImplDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestServiceImpl', function(TestServiceImpl) {
                            return TestServiceImpl.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-service-impl.new', {
            parent: 'test-service-impl',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-impl/test-service-impl-dialog.html',
                    controller: 'TestServiceImplDialogController',
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
                    $state.go('test-service-impl', null, { reload: 'test-service-impl' });
                }, function() {
                    $state.go('test-service-impl');
                });
            }]
        })
        .state('test-service-impl.edit', {
            parent: 'test-service-impl',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-impl/test-service-impl-dialog.html',
                    controller: 'TestServiceImplDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestServiceImpl', function(TestServiceImpl) {
                            return TestServiceImpl.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-service-impl', null, { reload: 'test-service-impl' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-service-impl.delete', {
            parent: 'test-service-impl',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-impl/test-service-impl-delete-dialog.html',
                    controller: 'TestServiceImplDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestServiceImpl', function(TestServiceImpl) {
                            return TestServiceImpl.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-service-impl', null, { reload: 'test-service-impl' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
