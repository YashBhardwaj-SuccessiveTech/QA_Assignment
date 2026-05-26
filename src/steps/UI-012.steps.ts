import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

When(
    "User clicks on the brand name {string} in the left sidebar",
    async function (this: CustomWorld, brandName: string) {
        await this.pages.productsPage.selectBrandFilter(brandName);
    }
);

Then(
    "All returned filtered product cards must belong to the brand {string}",
    async function (this: CustomWorld, brandName: string) {
        await this.pages.productsPage.verifyAllCardsBelongToBrand(brandName);
    }
);