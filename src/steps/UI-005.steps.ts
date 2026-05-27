import { Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

When(
  "User enters registered email and password",
  async function (this: CustomWorld) {
    await this.pages.loginPage.enterLoginCredentials(
      this.userData.email,
      this.userData.password,
    );
  },
);

Then(
  "Logged in username banner should be visible",
  async function (this: CustomWorld) {
    await this.pages.homePage.verifyLoggedInBanner(this.userData.name);
  },
);

Then("Logout button should be visible", async function (this: CustomWorld) {
  await this.pages.homePage.verifyLogoutButton();
});
