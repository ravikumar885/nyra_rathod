import type{ Page } from '@playwright/test';
export class AddProductPage {
  constructor(private readonly page: Page) {}


 private readonly addProductLink = '//a[text()="Samsung galaxy s6"]';
 private readonly addcart='//a[text()="Add to cart"]'
 private readonly cartLink = '//a[text()="Cart"]';

 async addProduct(): Promise<void> {
   await this.page.locator(this.addProductLink).click();

   this.page.once('dialog', (dialog) => dialog.accept());
   await this.page.locator(this.addcart).click();

   await this.page.locator(this.cartLink).click();
 }
}
