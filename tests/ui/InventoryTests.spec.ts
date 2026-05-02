import { expect } from '@playwright/test';
import {test} from '../../fixtures/pageFixtures'

test('add to cart',async({page})=>{
    const productName = 'Sauce Labs Bolt T-Shirt';
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await inventoryPage.addToCart(productName);

})

test.only('sort product',async({loginPage, inventoryPage})=>{
    const sortProducts = 'Price (low to high)';
     await loginPage.login('standard_user','secret_sauce');
    const prodcutPrice =  await inventoryPage.sortProducts(sortProducts);
    const expectedSorted =  [...prodcutPrice].sort((a,b) => a - b) 
    expect(prodcutPrice).toEqual(expectedSorted);

})

test('get product list',async({page})=>{
     const loginPage = new LoginPage(page);
     const inventoryPage=new InventoryPage(page)
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
    const productList =  await inventoryPage.getProductList();



    console.log(productList);

})

//NEED TO FIX add to cart ad get product list