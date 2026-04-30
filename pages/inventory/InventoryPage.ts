import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage{
    readonly page : Page
    readonly listOfInventory : Locator
    readonly productsName : string[] = []; 
    constructor(page : Page){
        this.page = page;
        this.listOfInventory = this.page.locator('.inventory_item');


    }

    async addToCart(productName : string){
       const count =  await this.listOfInventory.count();

        for (let i=0;i< count;i++){
            const  item = await this.listOfInventory.nth(i);
            const name = await item.locator('.inventory_item_name').textContent()
            if (name?.trim() === productName)
            {   
                await item.getByRole('button', { name: 'Add to cart' }).click();
                 break;
            }
        }

    }
     async sortProducts(option: string){
        await this.page.selectOption('.product_sort_container',option);
        await expect(this.page.locator('.active_option')).toHaveText(option)
        
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