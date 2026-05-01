import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { InventoryPage } from "../../pages/inventory/InventoryPage";
import { Cartpage } from "../../pages/cart/CartPage";
import { CheckoutPage } from "../../pages/checkout/CheckoutPage";

test.only('Checkout Item',async({page})=>{
    const productName1 = 'Sauce Labs Bike Light';
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await inventoryPage.addToCart(productName1);
    const cartPage = new Cartpage(page);
    const productList =  await cartPage.getCartItems();
    const checkoutPage = new CheckoutPage(page);
   await checkoutPage.enterDetails("Sagar","Wanjari","411057");
   await checkoutPage.finishOrder();
    const message = await checkoutPage.getSuccessMessage();
    expect(message).toBe('Thank you for your order!')

})

