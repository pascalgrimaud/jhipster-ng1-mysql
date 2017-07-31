(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-service-impl-entity', {
            parent: 'entity',
            url: '/field-test-service-impl-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestServiceImplEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-service-impl-entity/field-test-service-impl-entities.html',
                    controller: 'FieldTestServiceImplEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestServiceImplEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-service-impl-entity-detail', {
            parent: 'field-test-service-impl-entity',
            url: '/field-test-service-impl-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestServiceImplEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-detail.html',
                    controller: 'FieldTestServiceImplEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestServiceImplEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestServiceImplEntity', function($stateParams, FieldTestServiceImplEntity) {
                    return FieldTestServiceImplEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-service-impl-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-service-impl-entity-detail.edit', {
            parent: 'field-test-service-impl-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-dialog.html',
                    controller: 'FieldTestServiceImplEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestServiceImplEntity', function(FieldTestServiceImplEntity) {
                            return FieldTestServiceImplEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-service-impl-entity.new', {
            parent: 'field-test-service-impl-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-dialog.html',
                    controller: 'FieldTestServiceImplEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringMika: null,
                                stringRequiredMika: null,
                                stringMinlengthMika: null,
                                stringMaxlengthMika: null,
                                stringPatternMika: null,
                                integerMika: null,
                                integerRequiredMika: null,
                                integerMinMika: null,
                                integerMaxMika: null,
                                longMika: null,
                                longRequiredMika: null,
                                longMinMika: null,
                                longMaxMika: null,
                                floatMika: null,
                                floatRequiredMika: null,
                                floatMinMika: null,
                                floatMaxMika: null,
                                doubleRequiredMika: null,
                                doubleMinMika: null,
                                doubleMaxMika: null,
                                bigDecimalRequiredMika: null,
                                bigDecimalMinMika: null,
                                bigDecimalMaxMika: null,
                                localDateMika: null,
                                localDateRequiredMika: null,
                                zonedDateTimeMika: null,
                                zonedDateTimeRequiredMika: null,
                                booleanMika: null,
                                booleanRequiredMika: false,
                                enumMika: null,
                                enumRequiredMika: null,
                                byteImageMika: null,
                                byteImageMikaContentType: null,
                                byteImageRequiredMika: null,
                                byteImageRequiredMikaContentType: null,
                                byteImageMinbytesMika: null,
                                byteImageMinbytesMikaContentType: null,
                                byteImageMaxbytesMika: null,
                                byteImageMaxbytesMikaContentType: null,
                                byteAnyMika: null,
                                byteAnyMikaContentType: null,
                                byteAnyRequiredMika: null,
                                byteAnyRequiredMikaContentType: null,
                                byteAnyMinbytesMika: null,
                                byteAnyMinbytesMikaContentType: null,
                                byteAnyMaxbytesMika: null,
                                byteAnyMaxbytesMikaContentType: null,
                                byteTextMika: null,
                                byteTextRequiredMika: null,
                                byteTextMinbytesMika: null,
                                byteTextMaxbytesMika: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-service-impl-entity', null, { reload: 'field-test-service-impl-entity' });
                }, function() {
                    $state.go('field-test-service-impl-entity');
                });
            }]
        })
        .state('field-test-service-impl-entity.edit', {
            parent: 'field-test-service-impl-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-dialog.html',
                    controller: 'FieldTestServiceImplEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestServiceImplEntity', function(FieldTestServiceImplEntity) {
                            return FieldTestServiceImplEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-service-impl-entity', null, { reload: 'field-test-service-impl-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-service-impl-entity.delete', {
            parent: 'field-test-service-impl-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-delete-dialog.html',
                    controller: 'FieldTestServiceImplEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestServiceImplEntity', function(FieldTestServiceImplEntity) {
                            return FieldTestServiceImplEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-service-impl-entity', null, { reload: 'field-test-service-impl-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
