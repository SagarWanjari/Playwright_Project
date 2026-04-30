import { expect , test} from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";



test('Test 1: Valid Login', async ({page})=>{
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page).toHaveTitle('Swag Labs');
   
})

test('Test 2: Invalid Login', async ({page})=>{
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await loginPage.login('aaa','secret_sauce');
    const errorMsg = await loginPage.getSystemErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');
   
})

test('Test 3: Locked User Login', async ({page})=>{
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await loginPage.login('locked_out_user','secret_sauce');
    const errorMsg = await loginPage.getSystemErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out.');
   
})