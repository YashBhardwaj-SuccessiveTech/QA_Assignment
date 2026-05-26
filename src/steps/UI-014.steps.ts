import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

When(
    "User hovers over the first product card and clicks \"Add to cart\" again",
    async function (this: CustomWorld) {
        await this.pages.productsPage.addFirstProductToCartViaHover();
    }
);

Then(
    "The cart table row quantity should display {string}",
    async function (this: CustomWorld, expectedQuantity: string) {
        // Pure abstraction ➔ call the page object method directly
        await this.pages.cartPage.verifyCartRowQuantity(expectedQuantity);
    }
);

Then(
    "The cart table row subtotal calculation should update accurately based on unit price",
    async function (this: CustomWorld) {
        await this.pages.cartPage.verifyCalculatedSubtotal();
    }
);