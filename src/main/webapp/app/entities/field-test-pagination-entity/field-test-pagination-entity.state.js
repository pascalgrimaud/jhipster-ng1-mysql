(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-pagination-entity', {
            parent: 'entity',
            url: '/field-test-pagination-entity?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestPaginationEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-pagination-entity/field-test-pagination-entities.html',
                    controller: 'FieldTestPaginationEntityController',
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
                    $translatePartialLoader.addPart('fieldTestPaginationEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-pagination-entity-detail', {
            parent: 'field-test-pagination-entity',
            url: '/field-test-pagination-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestPaginationEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-pagination-entity/field-test-pagination-entity-detail.html',
                    controller: 'FieldTestPaginationEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestPaginationEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestPaginationEntity', function($stateParams, FieldTestPaginationEntity) {
                    return FieldTestPaginationEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-pagination-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-pagination-entity-detail.edit', {
            parent: 'field-test-pagination-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pagination-entity/field-test-pagination-entity-dialog.html',
                    controller: 'FieldTestPaginationEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestPaginationEntity', function(FieldTestPaginationEntity) {
                            return FieldTestPaginationEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-pagination-entity.new', {
            parent: 'field-test-pagination-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pagination-entity/field-test-pagination-entity-dialog.html',
                    controller: 'FieldTestPaginationEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringAlice: null,
                                stringRequiredAlice: null,
                                stringMinlengthAlice: null,
                                stringMaxlengthAlice: null,
                                stringPatternAlice: null,
                                integerAlice: null,
                                integerRequiredAlice: null,
                                integerMinAlice: null,
                                integerMaxAlice: null,
                                longAlice: null,
                                longRequiredAlice: null,
                                longMinAlice: null,
                                longMaxAlice: null,
                                floatAlice: null,
                                floatRequiredAlice: null,
                                floatMinAlice: null,
                                floatMaxAlice: null,
                                doubleRequiredAlice: null,
                                doubleMinAlice: null,
                                doubleMaxAlice: null,
                                bigDecimalRequiredAlice: null,
                                bigDecimalMinAlice: null,
                                bigDecimalMaxAlice: null,
                                localDateAlice: null,
                                localDateRequiredAlice: null,
                                zonedDateTimeAlice: null,
                                zonedDateTimeRequiredAlice: null,
                                booleanAlice: null,
                                booleanRequiredAlice: false,
                                enumAlice: null,
                                enumRequiredAlice: null,
                                byteImageAlice: null,
                                byteImageAliceContentType: null,
                                byteImageRequiredAlice: null,
                                byteImageRequiredAliceContentType: null,
                                byteImageMinbytesAlice: null,
                                byteImageMinbytesAliceContentType: null,
                                byteImageMaxbytesAlice: null,
                                byteImageMaxbytesAliceContentType: null,
                                byteAnyAlice: null,
                                byteAnyAliceContentType: null,
                                byteAnyRequiredAlice: null,
                                byteAnyRequiredAliceContentType: null,
                                byteAnyMinbytesAlice: null,
                                byteAnyMinbytesAliceContentType: null,
                                byteAnyMaxbytesAlice: null,
                                byteAnyMaxbytesAliceContentType: null,
                                byteTextAlice: null,
                                byteTextRequiredAlice: null,
                                byteTextMinbytesAlice: null,
                                byteTextMaxbytesAlice: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-pagination-entity', null, { reload: 'field-test-pagination-entity' });
                }, function() {
                    $state.go('field-test-pagination-entity');
                });
            }]
        })
        .state('field-test-pagination-entity.edit', {
            parent: 'field-test-pagination-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pagination-entity/field-test-pagination-entity-dialog.html',
                    controller: 'FieldTestPaginationEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestPaginationEntity', function(FieldTestPaginationEntity) {
                            return FieldTestPaginationEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-pagination-entity', null, { reload: 'field-test-pagination-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-pagination-entity.delete', {
            parent: 'field-test-pagination-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pagination-entity/field-test-pagination-entity-delete-dialog.html',
                    controller: 'FieldTestPaginationEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestPaginationEntity', function(FieldTestPaginationEntity) {
                            return FieldTestPaginationEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-pagination-entity', null, { reload: 'field-test-pagination-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
