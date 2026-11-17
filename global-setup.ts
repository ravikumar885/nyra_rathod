import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { cwd } from 'node:process';
import { optionalEnv, requiredEnv } from './config/env';
import { LoginPage } from './pages/loginPage';

async function globalSetup(): Promise<void> {
  const username = optionalEnv('USERNAME', 'Username');
  const password = optionalEnv('PASSWORD', 'Password');
  if (!username || !password) {
    console.warn('Skipping authenticated setup: USERNAME and PASSWORD are required for login tests.');
    return;
  }

  const baseURL = requiredEnv('BASE_URL', 'Base_Url');
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
