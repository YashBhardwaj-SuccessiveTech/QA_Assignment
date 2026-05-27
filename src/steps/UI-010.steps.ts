import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

When(
  "User enters search keyword {string} in the product search bar",
  async function (this: CustomWorld, keyword: string) {
    await this.pages.productsPage.executeProductSearch(keyword);
  },
);

When(
  "User clicks the search submit button",
  async function (this: CustomWorld) {
    await this.pages.productsPage.clickSearchButton();
  },
);

Then(
  "All returned product cards must contain the keyword {string} in their title",
  async function (this: CustomWorld, keyword: string) {
    await this.pages.productsPage.verifySearchResultsKeyword(keyword);
  },
);