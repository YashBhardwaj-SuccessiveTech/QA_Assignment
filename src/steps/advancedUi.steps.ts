import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";

// =========================================================================
// UI-016: Network Interception & Asset Resiliency
// =========================================================================

Given("User initializes a network interception route to block all {string} type assets", async function (this: CustomWorld, assetType: string) {
    // Intercept matching network pathways via native engine API
    await this.page.route('**/*', (route) => {
        const request = route.request();
        if (request.resourceType() === assetType) {
            console.log(`[Network Interceptor] Intentionally aborting static asset: ${request.url()}`);
            route.abort(); // Aborts the asset request instantly
        } else {
            route.continue();
        }
    });
});

When("User navigates to the home page", async function (this: CustomWorld) {
    await this.pages.homePage.navigateHomePage();
});

Then("The textual page elements and navigation header should remain fully visible", async function (this: CustomWorld) {
    await this.pages.homePage.verifyLayoutTextResilience();
});

Then("The web layout structure preserves structural stability without breaking", async function (this: CustomWorld) {
    const bodyLocator = this.page.locator('body');
    const boundingBox = await bodyLocator.boundingBox();
    
    // Assert layout boundary box maps out correctly despite absent media assets
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeGreaterThan(0);
    console.log(`[Layout Audit] Confirmed layout boundary stability width: ${boundingBox!.width}px`);
});