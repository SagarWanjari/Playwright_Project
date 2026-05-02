import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage{
    readonly page : Page;
    readonly productsName : string[] = []; 
    readonly productPrice : number[] = []; 
    constructor(page : Page){
        this.page = page;
    }

     async sortProducts(option: string):Promise<number[]>{
        await this.page.selectOption('.product_sort_container',option);
        await expect(this.page.locator('.active_option')).toHaveText(option);
        const count =  await this.page.locator('.inventory_item_name').count();
   for(let i=0;i<count;i++){
       const productPrice =  await this.page.locator('.inventory_item_price').nth(i).textContent();
       if(productPrice !== null){
       const cleaned =  parseFloat(productPrice.replace('$',''));
      this.productPrice.push(cleaned)
       }
   }
   return this.productPrice

        
     }
async getProductList(): Promise<string[]>{

   const count =  await this.page.locator('.inventory_item_name').count();
   for(let i=0;i<count;i++){
       const productName =  await this.page.locator('.inventory_item_name').nth(i).textContent();
       if(productName !== null){
      this.productsName.push(productName)
       }
   }
   return this.productsName
}
}