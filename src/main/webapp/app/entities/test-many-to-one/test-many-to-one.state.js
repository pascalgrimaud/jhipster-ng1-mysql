(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-many-to-one', {
            parent: 'entity',
            url: '/test-many-to-one',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testManyToOne.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-many-to-one/test-many-to-ones.html',
                    controller: 'TestManyToOneController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testManyToOne');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-many-to-one-detail', {
            parent: 'test-many-to-one',
            url: '/test-many-to-one/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testManyToOne.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-many-to-one/test-many-to-one-detail.html',
                    controller: 'TestManyToOneDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testManyToOne');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestManyToOne', function($stateParams, TestManyToOne) {
                    return TestManyToOne.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-many-to-one',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-many-to-one-detail.edit', {
            parent: 'test-many-to-one-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-one/test-many-to-one-dialog.html',
                    controller: 'TestManyToOneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestManyToOne', function(TestManyToOne) {
                            return TestManyToOne.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-many-to-one.new', {
            parent: 'test-many-to-one',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-one/test-many-to-one-dialog.html',
                    controller: 'TestManyToOneDialogController',
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
                    $state.go('test-many-to-one', null, { reload: 'test-many-to-one' });
                }, function() {
                    $state.go('test-many-to-one');
                });
            }]
        })
        .state('test-many-to-one.edit', {
            parent: 'test-many-to-one',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-one/test-many-to-one-dialog.html',
                    controller: 'TestManyToOneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestManyToOne', function(TestManyToOne) {
                            return TestManyToOne.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-many-to-one', null, { reload: 'test-many-to-one' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-many-to-one.delete', {
            parent: 'test-many-to-one',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-one/test-many-to-one-delete-dialog.html',
                    controller: 'TestManyToOneDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestManyToOne', function(TestManyToOne) {
                            return TestManyToOne.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-many-to-one', null, { reload: 'test-many-to-one' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
