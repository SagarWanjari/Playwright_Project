
// async finishOrder()
// async getSuccessMessage(): Promise<string>

import { expect, Locator, Page } from "@playwright/test";


export class CheckoutPage{
    readonly page : Page;
    readonly btnCheckout:Locator;
    readonly inputUsername : Locator;
    readonly inputPassword : Locator;
    readonly inputPostalCode : Locator;
    readonly detailPageContinue : Locator;
    readonly btnFinish : Locator;

    constructor(page:Page){
        this.page = page;
        this.btnCheckout = this.page.getByRole('button',{'name':'Checkout'});
        this.inputUsername = this.page.getByPlaceholder('First Name');
        this.inputPassword = this.page.getByPlaceholder('Last Name');
        this.inputPostalCode = this.page.getByPlaceholder('Zip/Postal Code');
        this.detailPageContinue= this.page.locator('#continue');
        this.btnFinish= this.page.getByRole('button',{'name':'Finish'});

    }

    async enterDetails(firstName:string, lastName:string,zip:string){
        await this.btnCheckout.click();
        await this.inputUsername.fill(firstName);
        await this.inputPassword.fill(lastName);
        await this.inputPostalCode.fill(zip);
    }

     async finishOrder(){
       await this.detailPageContinue.click();
        await this.btnFinish.click();
     }

     async getSuccessMessage(): Promise<string>{
        return await this.page.locator('h2.complete-header').textContent() || '';
     }
} 