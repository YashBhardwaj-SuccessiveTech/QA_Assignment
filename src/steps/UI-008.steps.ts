import { Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

Then(
    "All products section header should be visible",
    async function (this: CustomWorld) {
        await this.pages.productsPage.verifyAllProductsHeaderVisible();
    }
);

Then(
    "The left sidebar displaying Category and Brands should be visible",
    async function (this: CustomWorld) {
        await this.pages.productsPage.verifyLeftSidebarVisible();
    }
);

Then(
    "The product catalog cards grid should display valid interactive items",
    async function (this: CustomWorld) {
        await this.pages.productsPage.verifyProductCardsDisplay();
    }
);

Then(
    "Subscription section should be visible in the layout footer",
    async function (this: CustomWorld) {
        await this.pages.productsPage.verifySubscriptionVisible();
    }
);