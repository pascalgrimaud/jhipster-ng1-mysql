'use strict';

describe('Controller Tests', function() {

    describe('TestServiceImpl Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestServiceImpl, MockTestManyToOne, MockTestManyToMany, MockTestOneToOne, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestServiceImpl = jasmine.createSpy('MockTestServiceImpl');
            MockTestManyToOne = jasmine.createSpy('MockTestManyToOne');
            MockTestManyToMany = jasmine.createSpy('MockTestManyToMany');
            MockTestOneToOne = jasmine.createSpy('MockTestOneToOne');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestServiceImpl': MockTestServiceImpl,
                'TestManyToOne': MockTestManyToOne,
                'TestManyToMany': MockTestManyToMany,
                'TestOneToOne': MockTestOneToOne,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("TestServiceImplDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testServiceImplUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
