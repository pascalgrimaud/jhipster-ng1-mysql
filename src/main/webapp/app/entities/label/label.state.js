(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('label', {
            parent: 'entity',
            url: '/label?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.label.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/label/labels.html',
                    controller: 'LabelController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('label');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('label-detail', {
            parent: 'label',
            url: '/label/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.label.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/label/label-detail.html',
                    controller: 'LabelDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('label');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Label', function($stateParams, Label) {
                    return Label.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'label',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('label-detail.edit', {
            parent: 'label-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label/label-dialog.html',
                    controller: 'LabelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Label', function(Label) {
                            return Label.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('label.new', {
            parent: 'label',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label/label-dialog.html',
                    controller: 'LabelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                label: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('label', null, { reload: 'label' });
                }, function() {
                    $state.go('label');
                });
            }]
        })
        .state('label.edit', {
            parent: 'label',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label/label-dialog.html',
                    controller: 'LabelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Label', function(Label) {
                            return Label.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('label', null, { reload: 'label' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('label.delete', {
            parent: 'label',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label/label-delete-dialog.html',
                    controller: 'LabelDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Label', function(Label) {
                            return Label.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('label', null, { reload: 'label' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
