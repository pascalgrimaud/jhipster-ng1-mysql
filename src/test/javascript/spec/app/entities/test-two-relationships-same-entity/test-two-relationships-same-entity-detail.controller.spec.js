'use strict';

describe('Controller Tests', function() {

    describe('TestTwoRelationshipsSameEntity Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestTwoRelationshipsSameEntity, MockTestEntity, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestTwoRelationshipsSameEntity = jasmine.createSpy('MockTestTwoRelationshipsSameEntity');
            MockTestEntity = jasmine.createSpy('MockTestEntity');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestTwoRelationshipsSameEntity': MockTestTwoRelationshipsSameEntity,
                'TestEntity': MockTestEntity,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("TestTwoRelationshipsSameEntityDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testTwoRelationshipsSameEntityUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
