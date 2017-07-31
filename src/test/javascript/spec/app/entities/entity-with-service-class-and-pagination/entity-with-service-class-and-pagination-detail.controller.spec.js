'use strict';

describe('Controller Tests', function() {

    describe('EntityWithServiceClassAndPagination Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockEntityWithServiceClassAndPagination;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockEntityWithServiceClassAndPagination = jasmine.createSpy('MockEntityWithServiceClassAndPagination');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'EntityWithServiceClassAndPagination': MockEntityWithServiceClassAndPagination
            };
            createController = function() {
                $injector.get('$controller')("EntityWithServiceClassAndPaginationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:entityWithServiceClassAndPaginationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
