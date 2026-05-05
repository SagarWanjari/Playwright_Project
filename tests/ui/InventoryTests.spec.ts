import { expect } from '@playwright/test';
import {test} from '../../fixtures/pageFixtures'

test('add to cart @UI',async({loginPage, productComponent})=>{
    const productName = 'Sauce Labs Bolt T-Shirt';
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await productComponent.addToCart(productName);
})

test('sort product @UI',async({loginPage, inventoryPage})=>{
    const sortProducts = 'Price (low to high)';
     await loginPage.login('standard_user','secret_sauce');
    const prodcutPrice =  await inventoryPage.sortProducts(sortProducts);
    const expectedSorted =  [...prodcutPrice].sort((a,b) => a - b) 
    expect(prodcutPrice).toEqual(expectedSorted);

})

test('get product list @UI',async({loginPage, inventoryPage})=>{
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
    const productList =  await inventoryPage.getProductList();
    console.log(productList);
})
