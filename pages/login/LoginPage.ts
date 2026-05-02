import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{

    readonly page:Page
    readonly userName: Locator;
    readonly password:Locator;;
    readonly submit: Locator;
    readonly errorMessage : Locator;

    constructor(page : Page){
        this.page = page;
    this.userName = this.page.getByPlaceholder('Username');
    this.password = this.page.getByPlaceholder('Password');
     this.submit = this.page.getByRole('button',{'name':'Login'});
     this.errorMessage = this.page.locator('[data-test="error"]');
    }

    async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string){
        await this.goto();
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.submit.click();


    }
    async getSystemErrorMessage(): Promise<string> {
       return await this.errorMessage.textContent() || '';
    }
}