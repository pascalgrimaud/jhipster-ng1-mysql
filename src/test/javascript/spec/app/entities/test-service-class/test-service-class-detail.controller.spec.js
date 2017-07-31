'use strict';

describe('Controller Tests', function() {

    describe('TestServiceClass Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestServiceClass, MockTestManyToOne, MockTestManyToMany, MockTestOneToOne, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestServiceClass = jasmine.createSpy('MockTestServiceClass');
            MockTestManyToOne = jasmine.createSpy('MockTestManyToOne');
            MockTestManyToMany = jasmine.createSpy('MockTestManyToMany');
            MockTestOneToOne = jasmine.createSpy('MockTestOneToOne');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestServiceClass': MockTestServiceClass,
                'TestManyToOne': MockTestManyToOne,
                'TestManyToMany': MockTestManyToMany,
                'TestOneToOne': MockTestOneToOne,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("TestServiceClassDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testServiceClassUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
