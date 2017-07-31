'use strict';

describe('Controller Tests', function() {

    describe('EntityWithServiceImplAndDTO Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockEntityWithServiceImplAndDTO;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockEntityWithServiceImplAndDTO = jasmine.createSpy('MockEntityWithServiceImplAndDTO');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'EntityWithServiceImplAndDTO': MockEntityWithServiceImplAndDTO
            };
            createController = function() {
                $injector.get('$controller')("EntityWithServiceImplAndDTODetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:entityWithServiceImplAndDTOUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
