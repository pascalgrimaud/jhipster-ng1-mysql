(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-mapstruct', {
            parent: 'entity',
            url: '/test-mapstruct',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testMapstruct.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-mapstruct/test-mapstructs.html',
                    controller: 'TestMapstructController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testMapstruct');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-mapstruct-detail', {
            parent: 'test-mapstruct',
            url: '/test-mapstruct/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testMapstruct.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-mapstruct/test-mapstruct-detail.html',
                    controller: 'TestMapstructDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testMapstruct');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestMapstruct', function($stateParams, TestMapstruct) {
                    return TestMapstruct.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-mapstruct',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-mapstruct-detail.edit', {
            parent: 'test-mapstruct-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-mapstruct/test-mapstruct-dialog.html',
                    controller: 'TestMapstructDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestMapstruct', function(TestMapstruct) {
                            return TestMapstruct.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-mapstruct.new', {
            parent: 'test-mapstruct',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-mapstruct/test-mapstruct-dialog.html',
                    controller: 'TestMapstructDialogController',
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
                    $state.go('test-mapstruct', null, { reload: 'test-mapstruct' });
                }, function() {
                    $state.go('test-mapstruct');
                });
            }]
        })
        .state('test-mapstruct.edit', {
            parent: 'test-mapstruct',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-mapstruct/test-mapstruct-dialog.html',
                    controller: 'TestMapstructDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestMapstruct', function(TestMapstruct) {
                            return TestMapstruct.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-mapstruct', null, { reload: 'test-mapstruct' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-mapstruct.delete', {
            parent: 'test-mapstruct',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-mapstruct/test-mapstruct-delete-dialog.html',
                    controller: 'TestMapstructDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestMapstruct', function(TestMapstruct) {
                            return TestMapstruct.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-mapstruct', null, { reload: 'test-mapstruct' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
