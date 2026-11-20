import {test, expect} from '@playwright/test';

test('Multiple Tabs Test', async ({ page }) => {

await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

await page.getByPlaceholder('Username').fill('Admin');

await page.getByPlaceholder('Password').fill('admin123');

//await page.getByRole('button', { name: 'Login' }).click();
await page.getByText('OrangeHRM, Inc').click();
await page.waitForTimeout(2000);

const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('link', { name: 'OrangeHRM, Inc' }).click(),
]);

await newPage.waitForLoadState('networkidle');
await newPage.bringToFront();

console.log('New tab URL:', newPage.url());
//await page.bringBackToFront();
//await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');


})