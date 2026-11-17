import { expect } from '@playwright/test';
import { test } from '../BaseFixture/loginFixture';
import { optionalEnv } from '../config/env';

test('Authenticated user can add a product', async ({ page, addProductPage,logoutPage }) => {
  test.skip(
    !optionalEnv('USERNAME', 'Username') || !optionalEnv('PASSWORD', 'Password'),
    'Requires USERNAME and PASSWORD environment variables.',
  );

  await page.goto('/');
  await expect(page).toHaveTitle('STORE');
 // await expect(page.locator('#nameofuser')).toBeVisible();
  await addProductPage.addProduct();
  await logoutPage.logout();
});