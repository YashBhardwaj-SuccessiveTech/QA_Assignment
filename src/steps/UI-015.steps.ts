import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";


Then(
    "User should see a contact form header {string}",
    async function (this: CustomWorld, expectedHeader: string) {
        await this.pages.contactPage.verifyContactHeaderVisible(expectedHeader);
    }
);

When(
    "User fills the contact form fields with valid information",
    async function (this: CustomWorld) {
        await this.pages.contactPage.fillContactForm(
            "Test Automation User",
            "test_automation_user@example.com",
            "Bug Report Request",
            "This is an automated test message executing a form attachment assertion workflow stream."
        );
    }
);

When(
    "User uploads a sample test file attachment",
    async function (this: CustomWorld) {
        // ➔ Simply pass the string path to any file that already exists in your root folder!
        await this.pages.contactPage.uploadAttachmentFile("./package.json");
    }
);

When(
    "User clicks the contact form submit button",
    async function (this: CustomWorld) {
        await this.pages.contactPage.submitContactFormWithDialogHandler();
    }
);

Then(
    "A contact success message {string} should be displayed",
    async function (this: CustomWorld, expectedSuccessMessage: string) {
        await this.pages.contactPage.verifyFormSubmissionSuccess(expectedSuccessMessage);
    }
);
