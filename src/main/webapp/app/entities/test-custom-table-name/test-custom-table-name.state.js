(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-custom-table-name', {
            parent: 'entity',
            url: '/test-custom-table-name',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testCustomTableName.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-custom-table-name/test-custom-table-names.html',
                    controller: 'TestCustomTableNameController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testCustomTableName');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-custom-table-name-detail', {
            parent: 'test-custom-table-name',
            url: '/test-custom-table-name/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testCustomTableName.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-custom-table-name/test-custom-table-name-detail.html',
                    controller: 'TestCustomTableNameDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testCustomTableName');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestCustomTableName', function($stateParams, TestCustomTableName) {
                    return TestCustomTableName.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-custom-table-name',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-custom-table-name-detail.edit', {
            parent: 'test-custom-table-name-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-custom-table-name/test-custom-table-name-dialog.html',
                    controller: 'TestCustomTableNameDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestCustomTableName', function(TestCustomTableName) {
                            return TestCustomTableName.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-custom-table-name.new', {
            parent: 'test-custom-table-name',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-custom-table-name/test-custom-table-name-dialog.html',
                    controller: 'TestCustomTableNameDialogController',
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
                    $state.go('test-custom-table-name', null, { reload: 'test-custom-table-name' });
                }, function() {
                    $state.go('test-custom-table-name');
                });
            }]
        })
        .state('test-custom-table-name.edit', {
            parent: 'test-custom-table-name',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-custom-table-name/test-custom-table-name-dialog.html',
                    controller: 'TestCustomTableNameDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestCustomTableName', function(TestCustomTableName) {
                            return TestCustomTableName.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-custom-table-name', null, { reload: 'test-custom-table-name' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-custom-table-name.delete', {
            parent: 'test-custom-table-name',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-custom-table-name/test-custom-table-name-delete-dialog.html',
                    controller: 'TestCustomTableNameDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestCustomTableName', function(TestCustomTableName) {
                            return TestCustomTableName.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-custom-table-name', null, { reload: 'test-custom-table-name' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
