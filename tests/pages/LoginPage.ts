import { type Locator, type Page, expect } from '@playwright/test';
import { SF_LOGIN_URL } from '../utils/env';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Salesforce login' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Your Password?' });
    this.errorMessage = page.getByText(/check your username and password/i);
  }

  async goto() {
    await this.page.goto(SF_LOGIN_URL);
    await expect(this.heading).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}
