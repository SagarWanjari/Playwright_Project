import { HeaderComponent } from "../components/header/HeaderComponent";
import { ProductComponent } from "../components/product/ProductComponent";
import { Cartpage } from "../pages/cart/CartPage";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { InventoryPage } from "../pages/inventory/InventoryPage";
import { LoginPage } from "../pages/login/LoginPage"
import { test as base} from '@playwright/test'


type MyFixture ={
      loginPage: LoginPage;
  inventoryPage: InventoryPage;
  header: HeaderComponent;
  cartPage: Cartpage;
  checkoutPage: CheckoutPage;
  productComponent: ProductComponent;
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
});