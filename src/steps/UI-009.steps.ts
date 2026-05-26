import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

interface ExtendedWorld extends CustomWorld {
    savedCardName?: string;
    savedCardPrice?: string;
}

When("User saves the name and price of the first product card", async function (this: CustomWorld) {
    const attributes = await this.pages.productsPage.getFirstCardAttributes();
    this.savedCardName = attributes.name;  // Safely stored in the world state context
    this.savedCardPrice = attributes.price;
});

When("User clicks \"View Product\" on the first product card", async function (this: ExtendedWorld) {
    await this.pages.productsPage.clickFirstViewProduct();
});

Then("User should navigate to the product details page view", async function (this: ExtendedWorld) {
    await this.pages.productsPage.verifyProductDetailsNavigation();
});

Then("The product details name and price must match the saved card attributes", async function (this: ExtendedWorld) {
    if (!this.savedCardName || !this.savedCardPrice) {
        throw new Error("Attributes were not saved correctly in framework scope session memory.");
    }
    await this.pages.productsPage.verifyDetailAttributes(this.savedCardName, this.savedCardPrice);
});

Then("The product metadata attributes should display valid status conditions", async function (this: ExtendedWorld) {
    // Dynamic execution call - zero hardcoded data strings 
    await this.pages.productsPage.verifyProductMetadataLayout();
});