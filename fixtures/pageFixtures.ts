import { HeaderComponent } from "../components/header/HeaderComponent";
import { ProductComponent } from "../components/product/ProductComponent";
import { Cartpage } from "../pages/cart/CartPage";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { InventoryPage } from "../pages/inventory/InventoryPage";
import { LoginPage } from "../pages/login/LoginPage"
import { test as base, request, expect} from '@playwright/test'
import { UserApiClient } from '../api/client/UserApiClient';
import { collectFailure } from "../ai/hooks/aiCollector";

export { expect };

type MyFixture ={
      loginPage: LoginPage;
  inventoryPage: InventoryPage;
  header: HeaderComponent;
  cartPage: Cartpage;
  checkoutPage: CheckoutPage;
  productComponent: ProductComponent;
  userApi: UserApiClient;
  failureCollector: void;
};

export const test = base.extend<MyFixture>({
    loginPage : async ({page}, use) =>{
        await use(new LoginPage(page)); 
    },
    inventoryPage : async({page},use) => {
        await use(new InventoryPage(page));
    },
    header : async({page},use) => {
        await use(new HeaderComponent(page));
    },
  cartPage: async ({ page }, use) => {
    await use(new Cartpage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productComponent: async ({ page }, use) => {
    await use(new ProductComponent(page));
  },

  userApi: async ({}, use) => {
    if (!process.env.API_KEY || !process.env.BASE_URL) {
  throw new Error("Missing environment variables");
  }
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL,   // ✅ defined once
      extraHTTPHeaders: {
        'x-api-key': process.env.API_KEY!
      }
    });

    const userApi = new UserApiClient(apiContext);

    await use(userApi);

    await apiContext.dispose(); // cleanup
  },
  failureCollector: [async ({}, use, testInfo) => {
  await use();

  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    console.log("COLLECTING FAILURE");

    collectFailure(testInfo);

  }
}, { auto: true }]

});




