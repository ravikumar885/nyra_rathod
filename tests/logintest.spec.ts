import { expect } from '@playwright/test';
import { test } from '../BaseFixture/loginFixture';

test('Authenticated user can add a product', async ({ page, addProductPage,logoutPage }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('STORE');
 // await expect(page.locator('#nameofuser')).toBeVisible();
  await addProductPage.addProduct();
  await logoutPage.logout();
});