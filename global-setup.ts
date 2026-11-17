import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { cwd } from 'node:process';
import { requiredEnv } from './config/env';
import { LoginPage } from './pages/loginPage';

async function globalSetup(): Promise<void> {
  const baseURL = requiredEnv('BASE_URL', 'Base_Url');
  const username = requiredEnv('USERNAME', 'Username');
  const password = requiredEnv('PASSWORD', 'Password');
  const storageStatePath = resolve(cwd(), 'playwright', '.auth', 'user.json');

  mkdirSync(dirname(storageStatePath), { recursive: true });

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      await page.goto(baseURL);
      await new LoginPage(page).login(username, password);
      await context.storageState({ path: storageStatePath });
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

export default globalSetup;
