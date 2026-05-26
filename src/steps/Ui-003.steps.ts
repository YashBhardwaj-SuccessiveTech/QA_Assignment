import { When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world.js";

// Scenario :- Verify navigation to Sign-up / Login page


Then(
    "Login form section should be visible",
    async function (this: CustomWorld) {

        await this.pages.loginPage
            .verifyLoginFormSection();
    }
);

Then(
    "Signup form section should be visible",
    async function (this: CustomWorld) {

        await this.pages.loginPage
            .verifySignupFormSection();
    }
);

Then(
    '{string} text should be visible',
    async function (
        this: CustomWorld,
        text: string
    ) {

        await this.pages.loginPage
            .verifyTextVisibility(text);
    }
);