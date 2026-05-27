import { expect, type Locator, type Page } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly contactHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successStatusAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // Target headers and form fields using robust semantic locators
    this.contactHeader = page.getByRole("heading", {
      name: "Get In Touch",
      exact: false,
    });
    this.nameInput = page.getByPlaceholder("Name");
    this.emailInput = page.getByPlaceholder("Email", { exact: true });
    this.subjectInput = page.getByPlaceholder("Subject");
    this.messageInput = page.locator("#message"); // Textarea element uses id wrapper

    // Target the standard HTML file input element layout
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[name="submit"]');

    // Target the success status message element block
    this.successStatusAlert = page.locator(
      ".contact-form .status.alert-success",
    );
  }

  async verifyContactHeaderVisible(expectedText: string): Promise<void> {
    await expect(this.contactHeader).toBeVisible();
    await expect(this.contactHeader).toHaveText(new RegExp(expectedText, "i"));
  }

  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadAttachmentFile(absoluteFilePath: string): Promise<void> {
    // Playwright handles file selection natively via the setInputFiles method
    await this.uploadFileInput.setInputFiles(absoluteFilePath);
  }

  async submitContactFormWithDialogHandler(): Promise<void> {
    // 1. Setup the browser dialog intercept listener layer immediately
    this.page.once("dialog", async (dialog) => {
      console.log(
        `[Dialog Intercepted Successfully] Text: ${dialog.message()}`,
      );
      // Autonomously dismiss the dialog box by clicking the browser's native "OK" button
      await dialog.accept();
    });

    // 2. Introduce a microscopic delay to guarantee the browser registers the listener
    await this.page.waitForTimeout(500);

    // 3. Fire the click interaction to trigger the actual form dispatch payload
    await this.submitButton.click();
  }

  async verifyFormSubmissionSuccess(
    expectedSuccessMessage: string,
  ): Promise<void> {
    // Force a loose visibility validation checkpoint
    await this.successStatusAlert.scrollIntoViewIfNeeded();

    // Validate text contents dynamically using regex to bypass structural text layout padding bugs
    await expect(this.successStatusAlert).toHaveText(
      new RegExp(expectedSuccessMessage.trim(), "i"),
      { timeout: 7000 },
    );
  }
}
