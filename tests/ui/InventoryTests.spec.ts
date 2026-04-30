import test from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { InventoryPage } from "../../pages/inventory/InventoryPage";



test('add to cart',async({page})=>{
    const productName = 'Sauce Labs Bolt T-Shirt'
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await inventoryPage.addToCart(productName);

})
test('sort product',async({page})=>{
    const sortProducts = 'Price (low to high)'
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await inventoryPage.sortProducts(sortProducts);

})

test.only('get product list',async({page})=>{
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
    const productList =  await inventoryPage.getProductList();

    console.log(productList);

})