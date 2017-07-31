(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-infinite-scroll-entity', {
            parent: 'entity',
            url: '/field-test-infinite-scroll-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestInfiniteScrollEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entities.html',
                    controller: 'FieldTestInfiniteScrollEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestInfiniteScrollEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-infinite-scroll-entity-detail', {
            parent: 'field-test-infinite-scroll-entity',
            url: '/field-test-infinite-scroll-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestInfiniteScrollEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-detail.html',
                    controller: 'FieldTestInfiniteScrollEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestInfiniteScrollEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestInfiniteScrollEntity', function($stateParams, FieldTestInfiniteScrollEntity) {
                    return FieldTestInfiniteScrollEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-infinite-scroll-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-infinite-scroll-entity-detail.edit', {
            parent: 'field-test-infinite-scroll-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-dialog.html',
                    controller: 'FieldTestInfiniteScrollEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestInfiniteScrollEntity', function(FieldTestInfiniteScrollEntity) {
                            return FieldTestInfiniteScrollEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-infinite-scroll-entity.new', {
            parent: 'field-test-infinite-scroll-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-dialog.html',
                    controller: 'FieldTestInfiniteScrollEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringHugo: null,
                                stringRequiredHugo: null,
                                stringMinlengthHugo: null,
                                stringMaxlengthHugo: null,
                                stringPatternHugo: null,
                                integerHugo: null,
                                integerRequiredHugo: null,
                                integerMinHugo: null,
                                integerMaxHugo: null,
                                longHugo: null,
                                longRequiredHugo: null,
                                longMinHugo: null,
                                longMaxHugo: null,
                                floatHugo: null,
                                floatRequiredHugo: null,
                                floatMinHugo: null,
                                floatMaxHugo: null,
                                doubleRequiredHugo: null,
                                doubleMinHugo: null,
                                doubleMaxHugo: null,
                                bigDecimalRequiredHugo: null,
                                bigDecimalMinHugo: null,
                                bigDecimalMaxHugo: null,
                                localDateHugo: null,
                                localDateRequiredHugo: null,
                                zonedDateTimeHugo: null,
                                zonedDateTimeRequiredHugo: null,
                                booleanHugo: null,
                                booleanRequiredHugo: false,
                                enumHugo: null,
                                enumRequiredHugo: null,
                                byteImageHugo: null,
                                byteImageHugoContentType: null,
                                byteImageRequiredHugo: null,
                                byteImageRequiredHugoContentType: null,
                                byteImageMinbytesHugo: null,
                                byteImageMinbytesHugoContentType: null,
                                byteImageMaxbytesHugo: null,
                                byteImageMaxbytesHugoContentType: null,
                                byteAnyHugo: null,
                                byteAnyHugoContentType: null,
                                byteAnyRequiredHugo: null,
                                byteAnyRequiredHugoContentType: null,
                                byteAnyMinbytesHugo: null,
                                byteAnyMinbytesHugoContentType: null,
                                byteAnyMaxbytesHugo: null,
                                byteAnyMaxbytesHugoContentType: null,
                                byteTextHugo: null,
                                byteTextRequiredHugo: null,
                                byteTextMinbytesHugo: null,
                                byteTextMaxbytesHugo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-infinite-scroll-entity', null, { reload: 'field-test-infinite-scroll-entity' });
                }, function() {
                    $state.go('field-test-infinite-scroll-entity');
                });
            }]
        })
        .state('field-test-infinite-scroll-entity.edit', {
            parent: 'field-test-infinite-scroll-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-dialog.html',
                    controller: 'FieldTestInfiniteScrollEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestInfiniteScrollEntity', function(FieldTestInfiniteScrollEntity) {
                            return FieldTestInfiniteScrollEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-infinite-scroll-entity', null, { reload: 'field-test-infinite-scroll-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-infinite-scroll-entity.delete', {
            parent: 'field-test-infinite-scroll-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-delete-dialog.html',
                    controller: 'FieldTestInfiniteScrollEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestInfiniteScrollEntity', function(FieldTestInfiniteScrollEntity) {
                            return FieldTestInfiniteScrollEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-infinite-scroll-entity', null, { reload: 'field-test-infinite-scroll-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
