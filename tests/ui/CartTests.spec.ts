import test from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { InventoryPage } from "../../pages/inventory/InventoryPage";
import { Cartpage } from "../../pages/cart/CartPage";



test('Remove From Cart',async({page})=>{
    const productName = 'Sauce Labs Bolt T-Shirt'
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await inventoryPage.addToCart(productName);
    const cartPage = new Cartpage(page);
    await cartPage.removeItem(productName);
})

test.only('Get Items From Cart',async({page})=>{
    const productName1 = 'Sauce Labs Bike Light';
    const productName2 = 'Sauce Labs Bolt T-Shirt';
    const productName3 = 'Sauce Labs Backpack';
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await inventoryPage.addToCart(productName1);
     await inventoryPage.addToCart(productName2);
     await inventoryPage.addToCart(productName3);
    const cartPage = new Cartpage(page);
   const productList =  await cartPage.getCartItems();
   console.log(productList);
})

