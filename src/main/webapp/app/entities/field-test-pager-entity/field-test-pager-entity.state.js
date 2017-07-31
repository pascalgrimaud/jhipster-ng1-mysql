(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-pager-entity', {
            parent: 'entity',
            url: '/field-test-pager-entity?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestPagerEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-pager-entity/field-test-pager-entities.html',
                    controller: 'FieldTestPagerEntityController',
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
                    $translatePartialLoader.addPart('fieldTestPagerEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-pager-entity-detail', {
            parent: 'field-test-pager-entity',
            url: '/field-test-pager-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestPagerEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-pager-entity/field-test-pager-entity-detail.html',
                    controller: 'FieldTestPagerEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestPagerEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestPagerEntity', function($stateParams, FieldTestPagerEntity) {
                    return FieldTestPagerEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-pager-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-pager-entity-detail.edit', {
            parent: 'field-test-pager-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pager-entity/field-test-pager-entity-dialog.html',
                    controller: 'FieldTestPagerEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestPagerEntity', function(FieldTestPagerEntity) {
                            return FieldTestPagerEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-pager-entity.new', {
            parent: 'field-test-pager-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pager-entity/field-test-pager-entity-dialog.html',
                    controller: 'FieldTestPagerEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringJade: null,
                                stringRequiredJade: null,
                                stringMinlengthJade: null,
                                stringMaxlengthJade: null,
                                stringPatternJade: null,
                                integerJade: null,
                                integerRequiredJade: null,
                                integerMinJade: null,
                                integerMaxJade: null,
                                longJade: null,
                                longRequiredJade: null,
                                longMinJade: null,
                                longMaxJade: null,
                                floatJade: null,
                                floatRequiredJade: null,
                                floatMinJade: null,
                                floatMaxJade: null,
                                doubleRequiredJade: null,
                                doubleMinJade: null,
                                doubleMaxJade: null,
                                bigDecimalRequiredJade: null,
                                bigDecimalMinJade: null,
                                bigDecimalMaxJade: null,
                                localDateJade: null,
                                localDateRequiredJade: null,
                                zonedDateTimeJade: null,
                                zonedDateTimeRequiredJade: null,
                                booleanJade: null,
                                booleanRequiredJade: false,
                                enumJade: null,
                                enumRequiredJade: null,
                                byteImageJade: null,
                                byteImageJadeContentType: null,
                                byteImageRequiredJade: null,
                                byteImageRequiredJadeContentType: null,
                                byteImageMinbytesJade: null,
                                byteImageMinbytesJadeContentType: null,
                                byteImageMaxbytesJade: null,
                                byteImageMaxbytesJadeContentType: null,
                                byteAnyJade: null,
                                byteAnyJadeContentType: null,
                                byteAnyRequiredJade: null,
                                byteAnyRequiredJadeContentType: null,
                                byteAnyMinbytesJade: null,
                                byteAnyMinbytesJadeContentType: null,
                                byteAnyMaxbytesJade: null,
                                byteAnyMaxbytesJadeContentType: null,
                                byteTextJade: null,
                                byteTextRequiredJade: null,
                                byteTextMinbytesJade: null,
                                byteTextMaxbytesJade: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-pager-entity', null, { reload: 'field-test-pager-entity' });
                }, function() {
                    $state.go('field-test-pager-entity');
                });
            }]
        })
        .state('field-test-pager-entity.edit', {
            parent: 'field-test-pager-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pager-entity/field-test-pager-entity-dialog.html',
                    controller: 'FieldTestPagerEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestPagerEntity', function(FieldTestPagerEntity) {
                            return FieldTestPagerEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-pager-entity', null, { reload: 'field-test-pager-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-pager-entity.delete', {
            parent: 'field-test-pager-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-pager-entity/field-test-pager-entity-delete-dialog.html',
                    controller: 'FieldTestPagerEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestPagerEntity', function(FieldTestPagerEntity) {
                            return FieldTestPagerEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-pager-entity', null, { reload: 'field-test-pager-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
