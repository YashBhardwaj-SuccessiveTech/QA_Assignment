import { When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world.js";

When(
    "User enters invalid email and password",
    async function (this: CustomWorld) {

        await this.pages.loginPage
            .enterLoginCredentials(
                "invaliduser@test.com",
                "wrongpassword"
            );
    }
);

Then(
    "Login error message should be visible",
    async function (this: CustomWorld) {

        await this.pages.loginPage
            .verifyLoginErrorMessage();
    }
);