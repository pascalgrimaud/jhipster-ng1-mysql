'use strict';

describe('FieldTestInfiniteScrollEntity e2e test', function () {

    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var entityMenu = element(by.id('entity-menu'));
    var accountMenu = element(by.id('account-menu'));
    var login = element(by.id('login'));
    var logout = element(by.id('logout'));

    beforeAll(function () {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
    });

    it('should load FieldTestInfiniteScrollEntities', function () {
        entityMenu.click();
        element.all(by.css('[ui-sref="field-test-infinite-scroll-entity"]')).first().click().then(function() {
            element.all(by.css('h2')).first().getAttribute('data-translate').then(function (value) {
                expect(value).toMatch(/travisMysqlApp.fieldTestInfiniteScrollEntity.home.title/);
            });
        });
    });

    it('should load create FieldTestInfiniteScrollEntity dialog', function () {
        element(by.css('[ui-sref="field-test-infinite-scroll-entity.new"]')).click().then(function() {
            element(by.css('h4.modal-title')).getAttribute('data-translate').then(function (value) {
                expect(value).toMatch(/travisMysqlApp.fieldTestInfiniteScrollEntity.home.createOrEditLabel/);
            });
            element(by.css('button.close')).click();
        });
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
