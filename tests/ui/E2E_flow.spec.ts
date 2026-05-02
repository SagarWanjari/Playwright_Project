import { test } from '../../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import user from '../../test-data/users.json';
import product from '../../test-data/products.json'

test('E2E Purchase Flow', async ({loginPage,
  header,
  cartPage,
  checkoutPage,
  productComponent}) => {

  await loginPage.login(user.validUser.username, user.validUser.password);
  await productComponent.addToCart(product.products[0]);
  await productComponent.addToCart(product.products[1]);

  await header.openCart();

  const items = await cartPage.getCartItems();
  expect(items).toContain(product.products[0]);

  await checkoutPage.enterDetails('John', 'Doe', '12345');
  await checkoutPage.finishOrder();

  expect(await checkoutPage.getSuccessMessage()).toContain('Thank you');
});

