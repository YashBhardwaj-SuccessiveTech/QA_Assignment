import { Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

Then(
  "The returned product catalog grid should be empty with zero items displayed",
  async function (this: CustomWorld) {
    // Direct execution call with zero hardcoded dependency constraints
    await this.pages.productsPage.verifySearchResultsEmptyState();
  },
);
