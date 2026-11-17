import{Page} from '@playwright/test';

export class LogoutPage {
  constructor(private readonly page: Page) {}
private readonly logoutLink = '#logout2';
  
async logout(): Promise<void> {
    await this.page.locator(this.logoutLink).click();
  }

}