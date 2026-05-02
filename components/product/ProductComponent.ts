import { Locator, Page } from "@playwright/test";


export class ProductComponent{
    readonly page : Page
        readonly listOfInventory : Locator;
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
        async getPrice(productName: string): Promise<number>
        {
            const count =  await this.listOfInventory.count();
            let price: string | null = null;
            for (let i=0;i< count;i++){
                const  item = await this.listOfInventory.nth(i);
                const name = await item.locator('.inventory_item_name').textContent()
                if (name?.trim() === productName)
                {   
                    price = await item.locator('.inventory_item_price').textContent()
                 
                     break;
                }
            }
                return parseFloat(price || '0');
        }

    
}