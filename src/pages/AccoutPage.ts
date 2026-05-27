import { expect, type Locator, type Page } from "@playwright/test";
import { UserData } from "../types/userData.js";

export class AccountPage {

    readonly page: Page;

    // Account Information Section
    readonly accountInformationText: Locator;

    // Title
    readonly mrTitleRadio: Locator;

    // User Credentials
    readonly passwordInput: Locator;

    // DOB
    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;

    // Checkboxes
    readonly newsletterCheckbox: Locator;
    readonly offersCheckbox: Locator;

    // Personal Information
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;

    // Address Information
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;

    // Buttons
    readonly createAccountButton: Locator;

    // Success Message
    readonly accountCreatedText: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Account Info
        this.accountInformationText =
            page.getByText("Enter Account Information");

        // Title
        this.mrTitleRadio =
            page.locator("#id_gender1");

        // Credentials
        this.passwordInput =
            page.locator("#password");

        // DOB
        this.dayDropdown =
            page.locator("#days");

        this.monthDropdown =
            page.locator("#months");

        this.yearDropdown =
            page.locator("#years");

        // Checkboxes
        this.newsletterCheckbox =
            page.locator("#newsletter");

        this.offersCheckbox =
            page.locator("#optin");

        // Personal Info
        this.firstNameInput =
            page.locator("#first_name");

        this.lastNameInput =
            page.locator("#last_name");

        this.addressInput =
            page.locator("#address1");

        // Address Info
        this.countryDropdown =
            page.locator("#country");

        this.stateInput =
            page.locator("#state");

        this.cityInput =
            page.locator("#city");

        this.zipcodeInput =
            page.locator("#zipcode");

        this.mobileNumberInput =
            page.locator("#mobile_number");

        // Button
        this.createAccountButton =
            page.getByRole("button", {
                name: "Create Account"
            });

        // Success
        this.accountCreatedText =
            page.getByText("Account Created!");

        this.continueButton = page.getByRole("link", {
            name: "Continue"
        });
    }

    // Verify Section

    async verifyAccountInformationSection(): Promise<void> {

        await expect(
            this.accountInformationText
        ).toBeVisible();
    }

    // Fill Form

    async fillAccountDetailsForm(userData: UserData): Promise<void> {

        await this.mrTitleRadio.check();

        await this.passwordInput.fill(userData.password);

        await this.dayDropdown.selectOption("10");

        await this.monthDropdown.selectOption("5");

        await this.yearDropdown.selectOption("2000");

        await this.newsletterCheckbox.check();

        await this.offersCheckbox.check();

        await this.firstNameInput.fill(userData.firstName);

        await this.lastNameInput.fill(userData.lastName);

        await this.addressInput.fill(userData.address);

        await this.countryDropdown.selectOption("India");

        await this.stateInput.fill(userData.state);

        await this.cityInput.fill(userData.city);

        await this.zipcodeInput.fill(userData.zipcode);

        await this.mobileNumberInput.fill(userData.mobileNumber);
    }

    // Create Account

    async clickCreateAccountButton(): Promise<void> {

        await this.createAccountButton.click();
    }

    // Success Validation

    async verifyAccountCreatedText(): Promise<void> {

        await expect(this.accountCreatedText).toBeVisible();
    }

    async clickContinueButton(): Promise<void> {

        await this.continueButton.click();
    }
}