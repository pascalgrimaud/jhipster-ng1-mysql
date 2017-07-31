(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-service-class', {
            parent: 'entity',
            url: '/test-service-class',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testServiceClass.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-service-class/test-service-classes.html',
                    controller: 'TestServiceClassController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testServiceClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-service-class-detail', {
            parent: 'test-service-class',
            url: '/test-service-class/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testServiceClass.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-service-class/test-service-class-detail.html',
                    controller: 'TestServiceClassDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testServiceClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestServiceClass', function($stateParams, TestServiceClass) {
                    return TestServiceClass.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-service-class',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-service-class-detail.edit', {
            parent: 'test-service-class-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-class/test-service-class-dialog.html',
                    controller: 'TestServiceClassDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestServiceClass', function(TestServiceClass) {
                            return TestServiceClass.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-service-class.new', {
            parent: 'test-service-class',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-class/test-service-class-dialog.html',
                    controller: 'TestServiceClassDialogController',
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
                    $state.go('test-service-class', null, { reload: 'test-service-class' });
                }, function() {
                    $state.go('test-service-class');
                });
            }]
        })
        .state('test-service-class.edit', {
            parent: 'test-service-class',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-class/test-service-class-dialog.html',
                    controller: 'TestServiceClassDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestServiceClass', function(TestServiceClass) {
                            return TestServiceClass.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-service-class', null, { reload: 'test-service-class' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-service-class.delete', {
            parent: 'test-service-class',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-service-class/test-service-class-delete-dialog.html',
                    controller: 'TestServiceClassDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestServiceClass', function(TestServiceClass) {
                            return TestServiceClass.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-service-class', null, { reload: 'test-service-class' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
