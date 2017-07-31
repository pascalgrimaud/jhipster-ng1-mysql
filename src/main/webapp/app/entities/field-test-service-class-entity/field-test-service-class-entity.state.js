(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-service-class-entity', {
            parent: 'entity',
            url: '/field-test-service-class-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestServiceClassEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-service-class-entity/field-test-service-class-entities.html',
                    controller: 'FieldTestServiceClassEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestServiceClassEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-service-class-entity-detail', {
            parent: 'field-test-service-class-entity',
            url: '/field-test-service-class-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestServiceClassEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-service-class-entity/field-test-service-class-entity-detail.html',
                    controller: 'FieldTestServiceClassEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestServiceClassEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestServiceClassEntity', function($stateParams, FieldTestServiceClassEntity) {
                    return FieldTestServiceClassEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-service-class-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-service-class-entity-detail.edit', {
            parent: 'field-test-service-class-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-class-entity/field-test-service-class-entity-dialog.html',
                    controller: 'FieldTestServiceClassEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestServiceClassEntity', function(FieldTestServiceClassEntity) {
                            return FieldTestServiceClassEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-service-class-entity.new', {
            parent: 'field-test-service-class-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-class-entity/field-test-service-class-entity-dialog.html',
                    controller: 'FieldTestServiceClassEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringBob: null,
                                stringRequiredBob: null,
                                stringMinlengthBob: null,
                                stringMaxlengthBob: null,
                                stringPatternBob: null,
                                integerBob: null,
                                integerRequiredBob: null,
                                integerMinBob: null,
                                integerMaxBob: null,
                                longBob: null,
                                longRequiredBob: null,
                                longMinBob: null,
                                longMaxBob: null,
                                floatBob: null,
                                floatRequiredBob: null,
                                floatMinBob: null,
                                floatMaxBob: null,
                                doubleRequiredBob: null,
                                doubleMinBob: null,
                                doubleMaxBob: null,
                                bigDecimalRequiredBob: null,
                                bigDecimalMinBob: null,
                                bigDecimalMaxBob: null,
                                localDateBob: null,
                                localDateRequiredBob: null,
                                zonedDateTimeBob: null,
                                zonedDateTimeRequiredBob: null,
                                booleanBob: null,
                                booleanRequiredBob: false,
                                enumBob: null,
                                enumRequiredBob: null,
                                byteImageBob: null,
                                byteImageBobContentType: null,
                                byteImageRequiredBob: null,
                                byteImageRequiredBobContentType: null,
                                byteImageMinbytesBob: null,
                                byteImageMinbytesBobContentType: null,
                                byteImageMaxbytesBob: null,
                                byteImageMaxbytesBobContentType: null,
                                byteAnyBob: null,
                                byteAnyBobContentType: null,
                                byteAnyRequiredBob: null,
                                byteAnyRequiredBobContentType: null,
                                byteAnyMinbytesBob: null,
                                byteAnyMinbytesBobContentType: null,
                                byteAnyMaxbytesBob: null,
                                byteAnyMaxbytesBobContentType: null,
                                byteTextBob: null,
                                byteTextRequiredBob: null,
                                byteTextMinbytesBob: null,
                                byteTextMaxbytesBob: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-service-class-entity', null, { reload: 'field-test-service-class-entity' });
                }, function() {
                    $state.go('field-test-service-class-entity');
                });
            }]
        })
        .state('field-test-service-class-entity.edit', {
            parent: 'field-test-service-class-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-class-entity/field-test-service-class-entity-dialog.html',
                    controller: 'FieldTestServiceClassEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestServiceClassEntity', function(FieldTestServiceClassEntity) {
                            return FieldTestServiceClassEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-service-class-entity', null, { reload: 'field-test-service-class-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-service-class-entity.delete', {
            parent: 'field-test-service-class-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-service-class-entity/field-test-service-class-entity-delete-dialog.html',
                    controller: 'FieldTestServiceClassEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestServiceClassEntity', function(FieldTestServiceClassEntity) {
                            return FieldTestServiceClassEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-service-class-entity', null, { reload: 'field-test-service-class-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
