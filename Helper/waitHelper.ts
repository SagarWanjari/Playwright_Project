import { Locator, Page } from "@playwright/test"

export class waitHelper{

    readonly page : Page;
    constructor(page:Page){
            this.page = page;

    }
 async waitForElement(locator:Locator){
    await locator.waitFor({state:'visible'})
 }

async waitForPageLoad(){
    await this.page.waitForLoadState('networkidle');
}
}