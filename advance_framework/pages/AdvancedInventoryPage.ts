import { Locator, Page, expect } from '@playwright/test';
import { SmartLocator } from '../smart-locator/SmartLocator';

export class AdvancedInventoryPage {

    readonly page: Page;

    readonly inventoryItems: Locator;
    readonly inventoryPrices: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {

        this.page = page;

        this.inventoryItems = page.locator('.inventory_item_name');
        this.inventoryPrices = page.locator('.inventory_item_price');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async openCart() {

        const cartButton = await SmartLocator.find({
            page: this.page,
            name: 'Shopping Cart',
            primary: '.shopping_cart_link',
            fallbackText: 'Cart'
        });

        await cartButton.click();
    }

    async sortProducts(option: string): Promise<number[]> {

        const prices: number[] = [];

        await this.sortDropdown.selectOption(option);

        const count = await this.inventoryPrices.count();

        for (let i = 0; i < count; i++) {

            const text = await this.inventoryPrices
                .nth(i)
                .textContent();

            if (text) {
                prices.push(
                    parseFloat(text.replace('$', ''))
                );
            }
        }

        return prices;
    }

    async getProductList(): Promise<string[]> {

        const products: string[] = [];

        const count = await this.inventoryItems.count();

        for (let i = 0; i < count; i++) {

            const text = await this.inventoryItems
                .nth(i)
                .textContent();

            if (text) {
                products.push(text);
            }
        }

        return products;
    }
}