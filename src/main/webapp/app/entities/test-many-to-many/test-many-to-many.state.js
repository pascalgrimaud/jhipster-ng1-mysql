(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-many-to-many', {
            parent: 'entity',
            url: '/test-many-to-many',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testManyToMany.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-many-to-many/test-many-to-manies.html',
                    controller: 'TestManyToManyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testManyToMany');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-many-to-many-detail', {
            parent: 'test-many-to-many',
            url: '/test-many-to-many/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testManyToMany.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-many-to-many/test-many-to-many-detail.html',
                    controller: 'TestManyToManyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testManyToMany');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestManyToMany', function($stateParams, TestManyToMany) {
                    return TestManyToMany.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-many-to-many',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-many-to-many-detail.edit', {
            parent: 'test-many-to-many-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-many/test-many-to-many-dialog.html',
                    controller: 'TestManyToManyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestManyToMany', function(TestManyToMany) {
                            return TestManyToMany.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-many-to-many.new', {
            parent: 'test-many-to-many',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-many/test-many-to-many-dialog.html',
                    controller: 'TestManyToManyDialogController',
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
                    $state.go('test-many-to-many', null, { reload: 'test-many-to-many' });
                }, function() {
                    $state.go('test-many-to-many');
                });
            }]
        })
        .state('test-many-to-many.edit', {
            parent: 'test-many-to-many',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-many/test-many-to-many-dialog.html',
                    controller: 'TestManyToManyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestManyToMany', function(TestManyToMany) {
                            return TestManyToMany.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-many-to-many', null, { reload: 'test-many-to-many' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-many-to-many.delete', {
            parent: 'test-many-to-many',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-many-to-many/test-many-to-many-delete-dialog.html',
                    controller: 'TestManyToManyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestManyToMany', function(TestManyToMany) {
                            return TestManyToMany.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-many-to-many', null, { reload: 'test-many-to-many' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
