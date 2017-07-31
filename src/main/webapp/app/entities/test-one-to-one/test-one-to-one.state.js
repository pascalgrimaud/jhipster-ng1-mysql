(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-one-to-one', {
            parent: 'entity',
            url: '/test-one-to-one',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testOneToOne.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-one-to-one/test-one-to-ones.html',
                    controller: 'TestOneToOneController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testOneToOne');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-one-to-one-detail', {
            parent: 'test-one-to-one',
            url: '/test-one-to-one/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testOneToOne.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-one-to-one/test-one-to-one-detail.html',
                    controller: 'TestOneToOneDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testOneToOne');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestOneToOne', function($stateParams, TestOneToOne) {
                    return TestOneToOne.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-one-to-one',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-one-to-one-detail.edit', {
            parent: 'test-one-to-one-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-one-to-one/test-one-to-one-dialog.html',
                    controller: 'TestOneToOneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestOneToOne', function(TestOneToOne) {
                            return TestOneToOne.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-one-to-one.new', {
            parent: 'test-one-to-one',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-one-to-one/test-one-to-one-dialog.html',
                    controller: 'TestOneToOneDialogController',
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
                    $state.go('test-one-to-one', null, { reload: 'test-one-to-one' });
                }, function() {
                    $state.go('test-one-to-one');
                });
            }]
        })
        .state('test-one-to-one.edit', {
            parent: 'test-one-to-one',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-one-to-one/test-one-to-one-dialog.html',
                    controller: 'TestOneToOneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestOneToOne', function(TestOneToOne) {
                            return TestOneToOne.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-one-to-one', null, { reload: 'test-one-to-one' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-one-to-one.delete', {
            parent: 'test-one-to-one',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-one-to-one/test-one-to-one-delete-dialog.html',
                    controller: 'TestOneToOneDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestOneToOne', function(TestOneToOne) {
                            return TestOneToOne.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-one-to-one', null, { reload: 'test-one-to-one' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
