import { When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world.js";

// Scenario :- Verify header navigation links are accessible

Then(
    "{string} navigation link should be visible",
    async function (
        this: CustomWorld,
        menuName: string
    ) {

        await this.pages.homePage
            .verifyNavigationMenu(menuName);
    }
);

// Scenario :- Verify header navigation links are keyboard accessible

When(
    "User presses the Tab key",
    async function (this: CustomWorld) {

        await this.pages.homePage
            .pressTabKey();
    }
);

Then(
    "Focus should move to header navigation links",
    async function (this: CustomWorld) {

        await this.pages.homePage
            .verifyHeaderFocus();
    }
);

Then(
    "User should navigate to Products page",
    async function (this: CustomWorld) {

        await this.pages.productsPage
            .verifyProductsPageNavigation();
    }
);
