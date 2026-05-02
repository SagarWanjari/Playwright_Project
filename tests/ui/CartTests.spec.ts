import { expect } from '@playwright/test';
import { test } from '../../fixtures/pageFixtures';
import { products } from '../../test-data/products.json'

test('Remove From Cart',async({loginPage, productComponent, cartPage})=>{
    const productName = 'Sauce Labs Bolt T-Shirt'
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await productComponent.addToCart(productName);
    await cartPage.removeItem(productName);
})

test.only('Get Items From Cart',async({loginPage, productComponent, cartPage})=>{
     await loginPage.goto();
     await loginPage.login('standard_user','secret_sauce');
     await productComponent.addToCart(products[0]);
     await productComponent.addToCart(products[1]);
    const productList =  await cartPage.getCartItems();
    expect(productList.length).toBe(2);
})
