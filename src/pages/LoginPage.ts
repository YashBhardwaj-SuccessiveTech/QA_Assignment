import {expect,type Locator,type Page} from "@playwright/test";

export class LoginPage {

    readonly page: Page;

    // Locators
    readonly loginFormSection: Locator;

    readonly signupFormSection: Locator;

    readonly signupNameInput: Locator;

    readonly signupEmailInput: Locator;

    readonly signupButton: Locator;

    readonly loginEmailInput: Locator;

    readonly loginPasswordInput: Locator;

    readonly loginButton: Locator;

    readonly loginErrorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.loginFormSection =
            page.locator(".login-form");

        this.signupFormSection =
            page.locator(".signup-form");

        this.signupNameInput =
            page.getByPlaceholder("Name");

        this.signupEmailInput =
            page.locator('input[data-qa="signup-email"]');

        this.signupButton =
            page.getByRole("button", {
                name: "Signup"
            });

        this.loginEmailInput = page.locator(
            'input[data-qa="login-email"]'
        );

        this.loginPasswordInput = page.locator(
            'input[data-qa="login-password"]'
        );

        this.loginButton = page.getByRole("button", {
            name: "Login"
        });

        this.loginErrorMessage = page.locator(
            'form[action="/login"] p'
        );
    }

    async verifyLoginFormSection(): Promise<void> {

        await expect(
            this.loginFormSection
        ).toBeVisible();
    }

    async verifySignupFormSection(): Promise<void> {

        await expect(
            this.signupFormSection
        ).toBeVisible();
    }

    async verifyTextVisibility(text: string): Promise<void> {

        await expect(
            this.page.getByText(text)
        ).toBeVisible();
    }

    async enterSignupNameAndEmail(
        name: string,
        email: string
    ): Promise<void> {

        await this.signupNameInput.fill(name);

        await this.signupEmailInput.fill(email);
    }

    async clickSignupButton(): Promise<void> {

        await this.signupButton.click();
    }

    async enterLoginCredentials(
        email: string,
        password: string
    ): Promise<void> {

        await this.loginEmailInput.fill(email);

        await this.loginPasswordInput.fill(password);

        await this.loginButton.click();
    }

    async verifyLoginErrorMessage(): Promise<void> {

    await expect(
            this.loginErrorMessage
        ).toBeVisible();
    }
    
}