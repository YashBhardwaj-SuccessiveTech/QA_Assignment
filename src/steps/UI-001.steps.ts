import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

// Scenario :- 01

Then(
  "Header navigation menu should be visible",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyHeaderNavigationMenu();
  },
);

Then("Home page slider should be visible", async function (this: CustomWorld) {
  await this.pages.homePage.verifyHomeSlider();
});

Then(
  "Category section should be visible on left sidebar",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyCategorySection();
  },
);

Then(
  "Brands section should be visible on left sidebar",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyBrandsSection();
  },
);

Then(
  "Features Items section should be visible",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyFeatureItemsSection();
  },
);

Then(
  "Recommended Items section should be visible",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyRecommendedItemsSection();
  },
);

Then(
  "Subscription section should be visible in footer",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifySubscriptionSection();
  },
);

// Scenario :- 02

Then(
  "{string} menu should be visible",
  async function (this: CustomWorld, menuName: string) {
    await this.pages.homePage.verifyNavigationMenu(menuName);
  },
);

// Scenario :- 03

Given(
  "User sets screen resolution to tablet size",
  async function (this: CustomWorld) {
    await this.pages.homePage.setTabletViewport();
  },
);

When("User refreshes the page", async function (this: CustomWorld) {
  await this.pages.homePage.refreshPage();
});

Then(
  "Category and product sections should align properly",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyCategoryAndProductAlignment();
  },
);

Then(
  "Product cards should display properly",
  async function (this: CustomWorld) {
    await this.pages.productsPage.verifyProductCardsDisplay();
  },
);

Then("No UI element should overlap", async function (this: CustomWorld) {
  await this.pages.homePage.verifyNoElementOverlap();
});
