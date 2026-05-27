import { Given, When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world.js";

Given("User is on the Home Page", async function (this: CustomWorld) {
  await this.pages.homePage.navigateHomePage();
});

When(
  "User clicks on {string} navigation link",
  async function (this: CustomWorld, menuName: string) {
    await this.pages.homePage.clickNavigationMenu(menuName);
  },
);

Then(
  "User should navigate to {string} page",
  async function (this: CustomWorld, url: string) {
    // If the step is checking for the products view, route it to ProductsPage
    if (url === "/products") {
      await this.pages.productsPage.verifyProductsPageNavigation();
    } else {
      // Otherwise, route it to your generic HomePage URL verifier
      await this.pages.homePage.verifyPageNavigation(url);
    }
  },
);

Then(
  "A {string} header section should be displayed",
  async function (this: CustomWorld, expectedHeader: string) {
    if (expectedHeader.toUpperCase() === "SEARCHED PRODUCTS") {
      // Route cleanly to the product search header assertion method
      await this.pages.productsPage.verifySearchedHeaderVisible();
    } else {
      // Strip out boilerplate text keywords to extract the brand name parameter
      const brandKeyword = expectedHeader.replace(/brand\s*-\s*/i, "").trim();
      await this.pages.productsPage.verifyBrandHeaderVisible(brandKeyword);
    }
  },
);
