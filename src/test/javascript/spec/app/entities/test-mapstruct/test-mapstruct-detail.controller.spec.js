'use strict';

describe('Controller Tests', function() {

    describe('TestMapstruct Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestMapstruct, MockTestManyToOne, MockTestManyToMany, MockTestOneToOne, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestMapstruct = jasmine.createSpy('MockTestMapstruct');
            MockTestManyToOne = jasmine.createSpy('MockTestManyToOne');
            MockTestManyToMany = jasmine.createSpy('MockTestManyToMany');
            MockTestOneToOne = jasmine.createSpy('MockTestOneToOne');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestMapstruct': MockTestMapstruct,
                'TestManyToOne': MockTestManyToOne,
                'TestManyToMany': MockTestManyToMany,
                'TestOneToOne': MockTestOneToOne,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("TestMapstructDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testMapstructUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
