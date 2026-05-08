import { Locator, Page } from "@playwright/test";

type LocatorOptions = {
    page: Page;
    name: string;
    primary: string;
    fallbackRole?: {
        role: any;
        name: string;
    };
    fallbackText?: string;
};

export class SmartLocator {

    static async find(options: LocatorOptions): Promise<Locator> {

        const {
            page,
            name,
            primary,
            fallbackRole,
            fallbackText
        } = options;

        // PRIMARY
        const primaryLocator = page.locator(primary);

        if (await primaryLocator.count() > 0) {
            console.log(`PRIMARY LOCATOR USED: ${name}`);
            return primaryLocator;
        }

        // ROLE FALLBACK
        if (fallbackRole) {

            const roleLocator = page.getByRole(
                fallbackRole.role,
                { name: fallbackRole.name }
            );

            if (await roleLocator.count() > 0) {
                console.log(`ROLE FALLBACK USED: ${name}`);
                return roleLocator;
            }
        }

        // TEXT FALLBACK
        if (fallbackText) {

            const textLocator = page.getByText(fallbackText);

            if (await textLocator.count() > 0) {
                console.log(`TEXT FALLBACK USED: ${name}`);
                return textLocator;
            }
        }

        throw new Error(`LOCATOR NOT FOUND: ${name}`);
    }
}