'use strict';

describe('Controller Tests', function() {

    describe('FieldTestInfiniteScrollEntity Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockFieldTestInfiniteScrollEntity;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockFieldTestInfiniteScrollEntity = jasmine.createSpy('MockFieldTestInfiniteScrollEntity');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'FieldTestInfiniteScrollEntity': MockFieldTestInfiniteScrollEntity
            };
            createController = function() {
                $injector.get('$controller')("FieldTestInfiniteScrollEntityDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:fieldTestInfiniteScrollEntityUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
