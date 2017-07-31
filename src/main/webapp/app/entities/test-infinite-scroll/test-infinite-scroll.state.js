(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('test-infinite-scroll', {
            parent: 'entity',
            url: '/test-infinite-scroll',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testInfiniteScroll.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-infinite-scroll/test-infinite-scrolls.html',
                    controller: 'TestInfiniteScrollController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testInfiniteScroll');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('test-infinite-scroll-detail', {
            parent: 'test-infinite-scroll',
            url: '/test-infinite-scroll/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.testInfiniteScroll.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/test-infinite-scroll/test-infinite-scroll-detail.html',
                    controller: 'TestInfiniteScrollDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('testInfiniteScroll');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TestInfiniteScroll', function($stateParams, TestInfiniteScroll) {
                    return TestInfiniteScroll.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'test-infinite-scroll',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('test-infinite-scroll-detail.edit', {
            parent: 'test-infinite-scroll-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-infinite-scroll/test-infinite-scroll-dialog.html',
                    controller: 'TestInfiniteScrollDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestInfiniteScroll', function(TestInfiniteScroll) {
                            return TestInfiniteScroll.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-infinite-scroll.new', {
            parent: 'test-infinite-scroll',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-infinite-scroll/test-infinite-scroll-dialog.html',
                    controller: 'TestInfiniteScrollDialogController',
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
                    $state.go('test-infinite-scroll', null, { reload: 'test-infinite-scroll' });
                }, function() {
                    $state.go('test-infinite-scroll');
                });
            }]
        })
        .state('test-infinite-scroll.edit', {
            parent: 'test-infinite-scroll',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-infinite-scroll/test-infinite-scroll-dialog.html',
                    controller: 'TestInfiniteScrollDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TestInfiniteScroll', function(TestInfiniteScroll) {
                            return TestInfiniteScroll.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-infinite-scroll', null, { reload: 'test-infinite-scroll' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('test-infinite-scroll.delete', {
            parent: 'test-infinite-scroll',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/test-infinite-scroll/test-infinite-scroll-delete-dialog.html',
                    controller: 'TestInfiniteScrollDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TestInfiniteScroll', function(TestInfiniteScroll) {
                            return TestInfiniteScroll.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('test-infinite-scroll', null, { reload: 'test-infinite-scroll' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
