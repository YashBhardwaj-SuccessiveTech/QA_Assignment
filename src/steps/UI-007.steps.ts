import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";


Then(
    "Logged in username banner should not be visible",
    async function (this: CustomWorld) {
        await this.pages.homePage.verifyLoggedInBannerNotVisible(this.userData.name);
    }
);


// New Step 2: UI Reversion Verification Check
Then(
    "{string} navigation link should be visible again",
    async function (this: CustomWorld, linkName: string) {
        if (linkName === "Signup / Login") {
            await this.pages.homePage.verifySignupLoginLinkVisible();
        }
    }
);
