'use strict';

describe('Controller Tests', function() {

    describe('EntityWithServiceImplAndPagination Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockEntityWithServiceImplAndPagination;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockEntityWithServiceImplAndPagination = jasmine.createSpy('MockEntityWithServiceImplAndPagination');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'EntityWithServiceImplAndPagination': MockEntityWithServiceImplAndPagination
            };
            createController = function() {
                $injector.get('$controller')("EntityWithServiceImplAndPaginationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:entityWithServiceImplAndPaginationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
