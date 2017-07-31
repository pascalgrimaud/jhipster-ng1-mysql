(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('field-test-mapstruct-entity', {
            parent: 'entity',
            url: '/field-test-mapstruct-entity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestMapstructEntity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entities.html',
                    controller: 'FieldTestMapstructEntityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestMapstructEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('field-test-mapstruct-entity-detail', {
            parent: 'field-test-mapstruct-entity',
            url: '/field-test-mapstruct-entity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'travisMysqlApp.fieldTestMapstructEntity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-detail.html',
                    controller: 'FieldTestMapstructEntityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fieldTestMapstructEntity');
                    $translatePartialLoader.addPart('enumFieldClass');
                    $translatePartialLoader.addPart('enumRequiredFieldClass');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FieldTestMapstructEntity', function($stateParams, FieldTestMapstructEntity) {
                    return FieldTestMapstructEntity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'field-test-mapstruct-entity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('field-test-mapstruct-entity-detail.edit', {
            parent: 'field-test-mapstruct-entity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-dialog.html',
                    controller: 'FieldTestMapstructEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestMapstructEntity', function(FieldTestMapstructEntity) {
                            return FieldTestMapstructEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-mapstruct-entity.new', {
            parent: 'field-test-mapstruct-entity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-dialog.html',
                    controller: 'FieldTestMapstructEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                stringEva: null,
                                stringRequiredEva: null,
                                stringMinlengthEva: null,
                                stringMaxlengthEva: null,
                                stringPatternEva: null,
                                integerEva: null,
                                integerRequiredEva: null,
                                integerMinEva: null,
                                integerMaxEva: null,
                                longEva: null,
                                longRequiredEva: null,
                                longMinEva: null,
                                longMaxEva: null,
                                floatEva: null,
                                floatRequiredEva: null,
                                floatMinEva: null,
                                floatMaxEva: null,
                                doubleRequiredEva: null,
                                doubleMinEva: null,
                                doubleMaxEva: null,
                                bigDecimalRequiredEva: null,
                                bigDecimalMinEva: null,
                                bigDecimalMaxEva: null,
                                localDateEva: null,
                                localDateRequiredEva: null,
                                zonedDateTimeEva: null,
                                zonedDateTimeRequiredEva: null,
                                booleanEva: null,
                                booleanRequiredEva: false,
                                enumEva: null,
                                enumRequiredEva: null,
                                byteImageEva: null,
                                byteImageEvaContentType: null,
                                byteImageRequiredEva: null,
                                byteImageRequiredEvaContentType: null,
                                byteImageMinbytesEva: null,
                                byteImageMinbytesEvaContentType: null,
                                byteImageMaxbytesEva: null,
                                byteImageMaxbytesEvaContentType: null,
                                byteAnyEva: null,
                                byteAnyEvaContentType: null,
                                byteAnyRequiredEva: null,
                                byteAnyRequiredEvaContentType: null,
                                byteAnyMinbytesEva: null,
                                byteAnyMinbytesEvaContentType: null,
                                byteAnyMaxbytesEva: null,
                                byteAnyMaxbytesEvaContentType: null,
                                byteTextEva: null,
                                byteTextRequiredEva: null,
                                byteTextMinbytesEva: null,
                                byteTextMaxbytesEva: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('field-test-mapstruct-entity', null, { reload: 'field-test-mapstruct-entity' });
                }, function() {
                    $state.go('field-test-mapstruct-entity');
                });
            }]
        })
        .state('field-test-mapstruct-entity.edit', {
            parent: 'field-test-mapstruct-entity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-dialog.html',
                    controller: 'FieldTestMapstructEntityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FieldTestMapstructEntity', function(FieldTestMapstructEntity) {
                            return FieldTestMapstructEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-mapstruct-entity', null, { reload: 'field-test-mapstruct-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('field-test-mapstruct-entity.delete', {
            parent: 'field-test-mapstruct-entity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-delete-dialog.html',
                    controller: 'FieldTestMapstructEntityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FieldTestMapstructEntity', function(FieldTestMapstructEntity) {
                            return FieldTestMapstructEntity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('field-test-mapstruct-entity', null, { reload: 'field-test-mapstruct-entity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
