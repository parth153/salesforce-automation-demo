import { test as base } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  allureUiSuite: void;
};

export const test = base.extend<Fixtures>({
  // Groups every UI spec under a single "UI (E2E)" parent suite in the Allure
  // report. Runs automatically for each test.
  allureUiSuite: [
    async ({}, use) => {
      await allure.parentSuite('UI (E2E)');
      await use();
    },
    { auto: true },
  ],
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
