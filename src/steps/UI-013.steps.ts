import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

When(
    "User hovers over the first product card and clicks \"Add to cart\"",
    async function (this: CustomWorld) {
        await this.pages.productsPage.addFirstProductToCartViaHover();
    }
);

Then(
    "A success modal pop-up text {string} should be displayed",
    async function (this: CustomWorld, expectedHeader: string) {
        await this.pages.productsPage.verifySuccessModalMessage(expectedHeader);
    }
);

When(
    "User clicks \"Continue Shopping\" button on the modal pop-up",
    async function (this: CustomWorld) {
        await this.pages.productsPage.clickContinueShopping();
    }
);

Then(
    "The cart page table should display the matching saved product attributes",
    async function (this: CustomWorld) {
        // Pure Page Object Model abstraction mapping
        await this.pages.cartPage.verifyCartRowAttributes(this.savedCardName!, this.savedCardPrice!);
    }
);