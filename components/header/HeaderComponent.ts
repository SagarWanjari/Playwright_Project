import { Locator, Page } from "@playwright/test";

export class HeaderComponent{
    readonly btnAddToCart : Locator;
    page: Page;
    readonly logoutMenu : Locator;
    readonly btnLogout : Locator;

    constructor(page : Page){
        this.page = page; 
        this.btnAddToCart = this.page.locator('.shopping_cart_link');
        this.logoutMenu = this.page.getByRole('button',{'name':'Open Menu'});
        this.btnLogout  = this.page.getByText('Logout')
        
    }

    async openCart(){
         await this.btnAddToCart.click();

    }
    async logout(){
        await this.logoutMenu.click();
        await this.btnLogout.click();
    }
}