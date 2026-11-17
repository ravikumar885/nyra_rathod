import{test,expect} from '@playwright/test';

test('Screenshot demo',async({page})=>{
    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle('STORE');
    await page.screenshot({path:'screenshot.png',fullPage:true});
})