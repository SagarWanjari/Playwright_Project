import { expect } from "@playwright/test";
import {test} from "../../fixtures/pageFixtures"

test('Checkout Item @UI',async({page, loginPage, header, productComponent, checkoutPage})=>{
    const productName1 = 'Sauce Labs Bike Light';
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await productComponent.addToCart(productName1);
    await header.openCart();
   await checkoutPage.enterDetails("Sagar","Wanjari","411057");
   await checkoutPage.finishOrder();
    const message = await checkoutPage.getSuccessMessage();
    expect(message).toBe('Thank you for your order!');
    await header.logout();
     // Validate redirected to login
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // Try to access protected page again
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Validate access is blocked
  await expect(page).toHaveURL('https://www.saucedemo.com/');
})
