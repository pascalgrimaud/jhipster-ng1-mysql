(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-entity', {
            parent: 'entity',
            url: '/field-test-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-entity/field-test-entities.html',
                    controller: 'FieldTestEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-entity-detail', {
            parent: 'field-test-entity',
            url: '/field-test-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-entity/field-test-entity-detail.html',
                    controller: 'FieldTestEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestEntity', function($stateParams, FieldTestEntity) {
                    return FieldTestEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-entity-detail.edit', {
            parent: 'field-test-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-entity/field-test-entity-dialog.html',
                    controller: 'FieldTestEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestEntity', function(FieldTestEntity) {
                            return FieldTestEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-entity.new', {
            parent: 'field-test-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-entity/field-test-entity-dialog.html',
                    controller: 'FieldTestEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringTom: null,
                                stringRequiredTom: null,
                                stringMinlengthTom: null,
                                stringMaxlengthTom: null,
                                stringPatternTom: null,
                                integerTom: null,
                                integerRequiredTom: null,
                                integerMinTom: null,
                                integerMaxTom: null,
                                longTom: null,
                                longRequiredTom: null,
                                longMinTom: null,
                                longMaxTom: null,
                                floatTom: null,
                                floatRequiredTom: null,
                                floatMinTom: null,
                                floatMaxTom: null,
                                doubleRequiredTom: null,
                                doubleMinTom: null,
                                doubleMaxTom: null,
                                bigDecimalRequiredTom: null,
                                bigDecimalMinTom: null,
                                bigDecimalMaxTom: null,
                                localDateTom: null,
                                localDateRequiredTom: null,
                                zonedDateTimeTom: null,
                                zonedDateTimeRequiredTom: null,
                                booleanTom: null,
                                booleanRequiredTom: false,
                                enumTom: null,
                                enumRequiredTom: null,
                                byteImageTom: null,
                                byteImageTomContentType: null,
                                byteImageRequiredTom: null,
                                byteImageRequiredTomContentType: null,
                                byteImageMinbytesTom: null,
                                byteImageMinbytesTomContentType: null,
                                byteImageMaxbytesTom: null,
                                byteImageMaxbytesTomContentType: null,
                                byteAnyTom: null,
                                byteAnyTomContentType: null,
                                byteAnyRequiredTom: null,
                                byteAnyRequiredTomContentType: null,
                                byteAnyMinbytesTom: null,
                                byteAnyMinbytesTomContentType: null,
                                byteAnyMaxbytesTom: null,
                                byteAnyMaxbytesTomContentType: null,
                                byteTextTom: null,
                                byteTextRequiredTom: null,
                                byteTextMinbytesTom: null,
                                byteTextMaxbytesTom: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-entity', null, { reload: 'field-test-entity' });
                }, function() {
                    $state.go('field-test-entity');
                });
            }]
        })
        .state('field-test-entity.edit', {
            parent: 'field-test-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-entity/field-test-entity-dialog.html',
                    controller: 'FieldTestEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestEntity', function(FieldTestEntity) {
                            return FieldTestEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-entity', null, { reload: 'field-test-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-entity.delete', {
            parent: 'field-test-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-entity/field-test-entity-delete-dialog.html',
                    controller: 'FieldTestEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestEntity', function(FieldTestEntity) {
                            return FieldTestEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-entity', null, { reload: 'field-test-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
