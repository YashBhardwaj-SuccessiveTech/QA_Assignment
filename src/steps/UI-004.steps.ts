import { When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world.js";

// import { userData } from "../utils/testData.js";
import { generateUserData } from "../utils/testData.js";

// Scenario :- Verify user can register with dynamically generated data

When(
  "User enters generated signup name and email",
  async function (this: CustomWorld) {
    const userData = generateUserData();

    this.userData = userData;

    await this.pages.loginPage.enterSignupNameAndEmail(
      userData.name,
      userData.email,
    );
  },
);

When(
  "User clicks on {string} button",
  async function (this: CustomWorld, buttonName: string) {
    if (buttonName === "Signup") {
      await this.pages.loginPage.clickSignupButton();
    }

    if (buttonName === "Create Account") {
      await this.pages.accountPage.clickCreateAccountButton();
    }
    if (buttonName === "Continue") {
      await this.pages.accountPage.clickContinueButton();
    }
  },
);

Then(
  "Account Information section should be visible",
  async function (this: CustomWorld) {
    await this.pages.accountPage.verifyAccountInformationSection();
  },
);

When("User fills account details form", async function (this: CustomWorld) {
  await this.pages.accountPage.fillAccountDetailsForm(this.userData);
});

Then(
  "Account Created message should be visible",
  async function (this: CustomWorld) {
    await this.pages.accountPage.verifyAccountCreatedText();
  },
);
