'use strict';

describe('Controller Tests', function() {

    describe('TestManyToMany Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTestManyToMany, MockTestEntity, MockTestMapstruct, MockTestServiceClass, MockTestServiceImpl, MockTestInfiniteScroll, MockTestPager, MockTestPagination, MockTestCustomTableName;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTestManyToMany = jasmine.createSpy('MockTestManyToMany');
            MockTestEntity = jasmine.createSpy('MockTestEntity');
            MockTestMapstruct = jasmine.createSpy('MockTestMapstruct');
            MockTestServiceClass = jasmine.createSpy('MockTestServiceClass');
            MockTestServiceImpl = jasmine.createSpy('MockTestServiceImpl');
            MockTestInfiniteScroll = jasmine.createSpy('MockTestInfiniteScroll');
            MockTestPager = jasmine.createSpy('MockTestPager');
            MockTestPagination = jasmine.createSpy('MockTestPagination');
            MockTestCustomTableName = jasmine.createSpy('MockTestCustomTableName');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TestManyToMany': MockTestManyToMany,
                'TestEntity': MockTestEntity,
                'TestMapstruct': MockTestMapstruct,
                'TestServiceClass': MockTestServiceClass,
                'TestServiceImpl': MockTestServiceImpl,
                'TestInfiniteScroll': MockTestInfiniteScroll,
                'TestPager': MockTestPager,
                'TestPagination': MockTestPagination,
                'TestCustomTableName': MockTestCustomTableName
            };
            createController = function() {
                $injector.get('$controller')("TestManyToManyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'travisMysqlApp:testManyToManyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
