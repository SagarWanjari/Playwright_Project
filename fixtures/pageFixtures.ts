import { HeaderComponent } from "../components/header/HeaderComponent";
import { ProductComponent } from "../components/product/ProductComponent";
import { Cartpage } from "../pages/cart/CartPage";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { InventoryPage } from "../pages/inventory/InventoryPage";
import { LoginPage } from "../pages/login/LoginPage"
import { test as base, request as base2} from '@playwright/test'
import { UserApiClient } from '../api/client/UserApiClient';

type MyFixture ={
      loginPage: LoginPage;
  inventoryPage: InventoryPage;
  header: HeaderComponent;
  cartPage: Cartpage;
  checkoutPage: CheckoutPage;
  productComponent: ProductComponent;
  userApi: UserApiClient;
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

    const apiContext = await base2.newContext({
      baseURL: 'https://reqres.in',   // ✅ defined once
      extraHTTPHeaders: {
        'x-api-key': process.env.API_KEY || 'free_user_3DAoUZHOIvac6Vr3ebbrpxj90oe'
      }
    });

    const userApi = new UserApiClient(apiContext);

    await use(userApi);

    await apiContext.dispose(); // cleanup
  }

});