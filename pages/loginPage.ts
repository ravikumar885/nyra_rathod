import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly loginLink = '#login2';
  private readonly usernameInput = '#loginusername';
  private readonly passwordInput = '#loginpassword';
  private readonly loginButton = '//button[text()="Log in"]';
  private readonly loggedInUser = '#nameofuser';

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(this.loginLink).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);

    const loginDialog = this.page.waitForEvent('dialog', { timeout: 10_000 });
    await this.page.locator(this.loginButton).click();
    await (await loginDialog).accept();
    //await this.page.locator(this.loggedInUser).waitFor({ state: 'visible' });
  }
}
