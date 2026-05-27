import { expect, type Locator, type Page } from "@playwright/test";
import { EnvironmentConfig } from "../config/environment.config.js";

export class HomePage {
  readonly page: Page;

  // Locators
  readonly home: Locator;
  readonly products: Locator;
  readonly cart: Locator;
  readonly signupLogin: Locator;
  readonly testCases: Locator;
  readonly apiTesting: Locator;
  readonly videoTutorials: Locator;
  readonly contactUs: Locator;

  // Home Page Sections
  readonly headerNavbar: Locator;
  readonly homeSlider: Locator;
  readonly categorySection: Locator;
  readonly brandsSection: Locator;
  readonly featureItemsSection: Locator;
  readonly recommendedItemsSection: Locator;
  readonly subscriptionSection: Locator;

  // Tablet Responsive Locators
  readonly leftSidebar: Locator;
  readonly productSection: Locator;
  readonly productCards: Locator;
  readonly loggedInBanner: Locator;
  readonly logoutButton: Locator;
  readonly featuredItemsHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navbar Locators
    this.home = page.getByRole("link", { name: "Home" });

    this.products = page.getByRole("link", { name: "Products" });

    this.cart = page.getByRole("link", { name: "Cart" });

    this.signupLogin = page.getByRole("link", { name: /Signup\s*\/\s*Login/ });

    this.testCases = page.getByRole("link", {
      name: "Test Cases",
      exact: true,
    });

    this.apiTesting = page.locator('a[href="/api_list"]');

    this.videoTutorials = page.getByRole("link", { name: "Video Tutorials" });

    this.contactUs = page.getByRole("link", { name: "Contact us" });

    // chat Gpt
    // this.headerNavbar = page.locator('header');
    this.headerNavbar = page.locator(".shop-menu");

    this.homeSlider = page.locator("#slider");

    this.categorySection = page.getByText("Category", { exact: true });

    this.brandsSection = page.getByText("Brands", { exact: true });

    this.featureItemsSection = page.getByText("Features Items");

    this.recommendedItemsSection = page.getByText("recommended items", {
      exact: false,
    });

    this.subscriptionSection = page.getByText("Subscription");

    // scenario :- 03

    this.leftSidebar = page.locator(".left-sidebar");

    this.productSection = page.locator(".features_items");

    this.productCards = page.locator(".product-image-wrapper");

    this.loggedInBanner = page.locator("li").filter({
      hasText: "Logged in as",
    });

    this.logoutButton = page.getByRole("link", {
      name: "Logout",
    });
    this.featuredItemsHeader = page.getByRole("heading", {
      name: "Features Items",
    });
  }

  async navigateHomePage(): Promise<void> {
    await this.page.goto(EnvironmentConfig.web.baseUrl);
  }

  // chat Gpt
  async verifyHeaderNavigationMenu(): Promise<void> {
    await expect(this.headerNavbar).toBeVisible();
  }

  async verifyHomeSlider(): Promise<void> {
    await expect(this.homeSlider).toBeVisible();
  }

  async verifyCategorySection(): Promise<void> {
    await expect(this.categorySection).toBeVisible();
  }

  async verifyBrandsSection(): Promise<void> {
    await expect(this.brandsSection).toBeVisible();
  }

  async verifyFeatureItemsSection(): Promise<void> {
    await expect(this.featureItemsSection).toBeVisible();
  }

  async verifyRecommendedItemsSection(): Promise<void> {
    await expect(this.recommendedItemsSection).toBeVisible();
  }

  async verifySubscriptionSection(): Promise<void> {
    await expect(this.subscriptionSection).toBeVisible();
  }

  async verifyNavigationMenu(menuName: string): Promise<void> {
    const menu = this.headerNavbar.getByRole("link", {
      name: menuName,
    });

    await expect(menu).toBeVisible();
  }

  // Scenario :- 03

  async setTabletViewport(): Promise<void> {
    await this.page.setViewportSize({
      width: 768,
      height: 1024,
    });

    await this.navigateHomePage();
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
  }

  async verifyCategoryAndProductAlignment(): Promise<void> {
    await expect(this.leftSidebar).toBeVisible();

    await expect(this.productSection).toBeVisible();
  }
  async verifyNoElementOverlap(): Promise<void> {
    const sidebarBox = await this.leftSidebar.boundingBox();

    const productBox = await this.productSection.boundingBox();

    expect(sidebarBox).not.toBeNull();

    expect(productBox).not.toBeNull();

    if (sidebarBox && productBox) {
      expect(sidebarBox.x + sidebarBox.width).toBeLessThanOrEqual(
        productBox.x + 20,
      );
    }
  }

  // Second Scenario
  async pressTabKey(): Promise<void> {
    await this.page.keyboard.press("Tab");
  }

  async verifyHeaderFocus(): Promise<void> {
    const focusedElement = this.page.locator(":focus");

    await expect(focusedElement).toBeVisible();
  }

  async clickNavigationMenu(menuName: string): Promise<void> {
    const menu = this.headerNavbar.getByRole("link", {
      name: menuName,
    });

    await menu.click();
  }

  async verifyPageNavigation(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${expectedUrl}`));
  }

  async verifyLoggedInBanner(username: string): Promise<void> {
    await expect(this.loggedInBanner).toContainText(username);
  }

  async verifyLogoutButton(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async verifyLoggedInBannerNotVisible(username: string): Promise<void> {
    // Dynamic string matching for the text banner check
    const banner = this.page.getByText(`Logged in as ${username}`);
    await expect(banner).not.toBeVisible();
  }

  async verifySignupLoginLinkVisible(): Promise<void> {
    // State Reversion Check: Ensure the link is visible and interactive again
    await expect(this.signupLogin).toBeVisible();
  }
  async navigateToLogin(): Promise<void> {
    await this.page.goto(`${EnvironmentConfig.web.baseUrl}/login`);
  }
  async verifyLayoutTextResilience(): Promise<void> {
    await expect(this.featuredItemsHeader).toBeVisible();
  }
}
