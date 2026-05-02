import { expect } from "@playwright/test";
import {test} from '../../fixtures/pageFixtures'
import users from "../../test-data/users.json";
import { Logger } from "../../Helper/logger";


test.only('Test 1: Valid Login', async ({page, loginPage})=>{
    Logger.info('Starting login test');
    await loginPage.login(users.validUser.username,users.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page).toHaveTitle('Swag Labs');
    Logger.info('User logged in successfully');
    await page.reload();
    await expect(page).toHaveTitle('Swag Labs');
   
})

test('Test 2: Invalid Login', async ({page, loginPage})=>{
    await loginPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await loginPage.login('aaa','secret_sauce');
    const errorMsg = await loginPage.getSystemErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');
   
})

test('Test 3: Locked User Login', async ({page, loginPage})=>{   
    await loginPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await loginPage.login(users.lockedUser.username,users.lockedUser.password);
    const errorMsg = await loginPage.getSystemErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out.');
   
})