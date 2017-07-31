'use strict';

describe('Controller Tests', function() {

    describe('TestEntity Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestEntity, MockTestManyToOne, MockTestManyToMany, MockTestOneToOne, MockUser, MockTestCustomTableName;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestEntity = jasmine.createSpy('MockTestEntity');
            MockTestManyToOne = jasmine.createSpy('MockTestManyToOne');
            MockTestManyToMany = jasmine.createSpy('MockTestManyToMany');
            MockTestOneToOne = jasmine.createSpy('MockTestOneToOne');
            MockUser = jasmine.createSpy('MockUser');
            MockTestCustomTableName = jasmine.createSpy('MockTestCustomTableName');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestEntity': MockTestEntity,
                'TestManyToOne': MockTestManyToOne,
                'TestManyToMany': MockTestManyToMany,
                'TestOneToOne': MockTestOneToOne,
                'User': MockUser,
                'TestCustomTableName': MockTestCustomTableName
            };
            createController = function() {
                $injector.get('$controller')("TestEntityDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testEntityUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
