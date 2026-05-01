import { Locator, Page } from "@playwright/test";


export class Cartpage{
    readonly page: Page;
    readonly btnAddToCart : Locator;
    counter: number = 0;
    readonly cartItem: Locator;
    
    constructor(page:Page){
        this.page = page ;
        this.btnAddToCart = this.page.locator('.shopping_cart_link');
        this.cartItem =  this.page.locator('.cart_item')
    }

    async removeItem(productName: string){
        await this.btnAddToCart.click();
       const count = await this.cartItem .count();
       for(let i=0;i < count;i++){
          const item =  await this.page.locator('.cart_item').nth(i);
         const currProductName= await item.locator('.inventory_item_name').textContent();
         if(currProductName?.trim() === productName){
            item.getByRole('button',{'name':'Remove'}).click();
            this.counter = 1 ;
            break;
         }
         
       }
       if(this.counter === 0){
       console.log ('Item Not Present');
       }

    }

 async getCartItems(): Promise<string[]>{
    await this.btnAddToCart.click();
    const productList: string[] = []; 
    const count = await this.cartItem .count();
    for(let i=0;i < count;i++){
        
        const item = this.page.locator('.cart_item').nth(i);
       const currProductName=  await item.locator('.inventory_item_name').textContent();
       if (currProductName){
       productList.push(currProductName);
    }  
    }
    return productList;
}
}