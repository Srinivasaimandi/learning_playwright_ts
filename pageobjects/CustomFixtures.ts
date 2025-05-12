import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage.pageobject';

type MyFixtures = {
    loginPage: LoginPage;
}

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {

    }
});