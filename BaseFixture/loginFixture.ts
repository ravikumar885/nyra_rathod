import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { AddProductPage } from '../pages/addproduct';
import { LogoutPage } from '../pages/logout';

type LoginFixture = {
  loginPage: LoginPage;
  addProductPage: AddProductPage;
    logoutPage: LogoutPage;
};

export const loginFixture = base.extend<LoginFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  addProductPage: async ({ page }, use) => {
    await use(new AddProductPage(page));
  },

//   logoutPage: async ({ page }, use) => {
//     await use(new LogoutPage(page));
//   },

logoutPage:async({ page},use)=>{
    await use(new LogoutPage(page));
},


});

export const test = loginFixture;