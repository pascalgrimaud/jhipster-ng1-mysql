'use strict';

describe('Controller Tests', function() {

    describe('TestPager Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestPager, MockTestManyToOne, MockTestManyToMany, MockTestOneToOne, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestPager = jasmine.createSpy('MockTestPager');
            MockTestManyToOne = jasmine.createSpy('MockTestManyToOne');
            MockTestManyToMany = jasmine.createSpy('MockTestManyToMany');
            MockTestOneToOne = jasmine.createSpy('MockTestOneToOne');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestPager': MockTestPager,
                'TestManyToOne': MockTestManyToOne,
                'TestManyToMany': MockTestManyToMany,
                'TestOneToOne': MockTestOneToOne,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("TestPagerDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testPagerUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
