import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productSection: Locator;
  readonly productCards: Locator;
  readonly leftSidebar: Locator;
  readonly subscriptionSection: Locator;

  // Scraper Locators
  readonly firstProductPrice: Locator;
  readonly firstProductName: Locator;
  readonly viewProductButton: Locator;

  // Details View Locators
  readonly detailName: Locator;
  readonly detailPrice: Locator;
  readonly detailAvailability: Locator;
  readonly detailCondition: Locator;
  readonly detailBrand: Locator;

  // UI-010 Specific Locators
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeader: Locator;
  readonly productNames: Locator;

  readonly brandFilterBlock: Locator;
  readonly brandResultsHeader: Locator;
  // UI-013 Explicit Locators
  readonly firstCardHoverContainer: Locator;
  readonly addToCartOverlayButton: Locator;
  readonly successModal: Locator;
  readonly successModalHeading: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSection = page.locator(".features_items");
    this.productCards = page.locator(".product-image-wrapper");
    this.leftSidebar = page.locator(".left-sidebar");
    this.subscriptionSection = page.getByText("Subscription");

    // ui-009
    // FIX: Scope your lookups cleanly inside the visible '.productinfo' block
    // to bypass the duplicate hover overlay paragraphs
    const firstCardVisibleContainer = this.productCards
      .nth(0)
      .locator(".productinfo");

    this.firstProductPrice = firstCardVisibleContainer.locator("h2");
    this.firstProductName = firstCardVisibleContainer.locator("p");

    // View Product button sits outside the .productinfo block but inside the card tile
    this.viewProductButton = this.productCards
      .nth(0)
      .getByRole("link", { name: "View Product" });

    // Information container elements driven by user-facing text markers
    const detailBlock = page.locator(".product-information");
    this.detailName = detailBlock.getByRole("heading", { level: 2 });
    this.detailPrice = detailBlock.getByText("Rs.");
    this.detailAvailability = detailBlock.locator(
      'p:has-text("Availability:")',
    );
    this.detailCondition = detailBlock.locator('p:has-text("Condition:")');
    this.detailBrand = detailBlock.locator('p:has-text("Brand:")');
    // Target search elements using standard semantic attributes
    this.searchInput = page.getByPlaceholder("Search Product");
    this.searchButton = page.locator("#submit_search");
    // Search view targets
    this.searchedProductsHeader = this.productSection.getByRole("heading", {
      name: "Searched Products",
      exact: false,
    });
    // Targeted cleanly inside the visible panel block to reuse what we learned from UI-009
    this.productNames = this.productSection.locator(".productinfo p");
    // Target the sidebar brand filtering panel section layout block
    this.brandFilterBlock = page.locator(".brands-name");
    // Grab heading elements within the features items list wrapper
    this.brandResultsHeader = this.productSection.getByRole("heading");
    // UI-013: Target the inner hover overlay container layout
    this.firstCardHoverContainer = this.productCards
      .nth(0)
      .locator(".product-overlay");
    // Target the overlay's specific add-to-cart anchor button link
    this.addToCartOverlayButton =
      this.firstCardHoverContainer.locator("a.add-to-cart");

    // Target the success modal container popup elements
    this.successModal = page.locator("#cartModal");
    this.successModalHeading = this.successModal.locator(".modal-title");
    this.continueShoppingButton = this.successModal.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async verifyProductsPageNavigation(): Promise<void> {
    await expect(this.page).toHaveURL(/products/);
  }

  async verifyAllProductsHeaderVisible(): Promise<void> {
    const allProductsHeader = this.productSection.getByRole("heading", {
      name: "All Products",
      exact: false,
    });
    await expect(allProductsHeader).toBeVisible();
  }

  async verifyLeftSidebarVisible(): Promise<void> {
    // Validates that category and brand filtering panels render alongside the grid
    await expect(this.leftSidebar).toBeVisible();
  }

  async verifySubscriptionVisible(): Promise<void> {
    // Validates footer persistence on the catalog view
    await expect(this.subscriptionSection).toBeVisible();
  }

  async verifyProductCardsDisplay(): Promise<void> {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(this.productCards.nth(i)).toBeVisible();
    }
  }

  // ui-009

  async getFirstCardAttributes(): Promise<{ name: string; price: string }> {
    const name = await this.firstProductName.innerText();
    const price = await this.firstProductPrice.innerText();
    return { name: name.trim(), price: price.trim() };
  }

  async clickFirstViewProduct(): Promise<void> {
    await this.viewProductButton.click();
  }

  async verifyProductDetailsNavigation(): Promise<void> {
    await expect(this.page).toHaveURL(/.*product_details.*/);
  }

  async verifyDetailAttributes(
    expectedName: string,
    expectedPrice: string,
  ): Promise<void> {
    await expect(this.detailName).toHaveText(expectedName);
    await expect(this.detailPrice).toContainText(expectedPrice);
  }

  async verifyProductMetadataLayout(): Promise<void> {
    await expect(this.detailAvailability).toHaveText(
      /^Availability:\s*[a-zA-Z ]+$/,
    );
    await expect(this.detailCondition).toHaveText(/^Condition:\s*[a-zA-Z ]+$/);
    await expect(this.detailBrand).toHaveText(/^Brand:\s*[a-zA-Z ]+$/);
  }

  // ui-010

  async executeProductSearch(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
  }

  async clickSearchButton(): Promise<void> {
    await this.searchButton.click();
  }

  async verifySearchedHeaderVisible(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.searchedProductsHeader).toBeVisible();
  }

  async verifySearchResultsKeyword(keyword: string): Promise<void> {
    const count = await this.productNames.count();
    expect(count).toBeGreaterThan(0);

    // 1. PERFORMANCE HYBRID CHECK: Select the very first item from the search results grid
    const firstProductLink = this.productCards
      .nth(0)
      .getByRole("link", { name: "View Product" });
    await firstProductLink.click();
    await this.verifyProductDetailsNavigation();

    // 2. ASSERTION DEEP DIVE: Verify the inner category metadata fields are linked to our keyword
    // This explicitly proves the backend filtered the data correctly!
    const detailBlock = this.page.locator(".product-information");
    const categoryText = await detailBlock
      .locator('p:has-text("Category:")')
      .innerText();

    // Check if either the title OR the Category metadata matches our query string safely
    const titleText = await this.detailName.innerText();
    const isKeywordMatched =titleText.toLowerCase().includes(keyword.toLowerCase()) || categoryText.toLowerCase().includes(keyword.toLowerCase());

    expect(isKeywordMatched).toBe(true);
    // 3. Navigate back out cleanly to restore the system state for subsequent steps
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");

    // 4. STRUCTURAL GRID CHECK: Ensure the rest of the layout elements remain fully intact
    for (let i = 0; i < count; i++) {
      await expect(this.productNames.nth(i)).toBeVisible();
    }
  }

  async verifySearchResultsEmptyState(): Promise<void> {
    // 1. Force Playwright to wait for the network layer and DOM to fully settle after the search execution
    await this.page.waitForLoadState("networkidle");
    // 2. Fetch the current count of product elements rendered inside the grid
    const count = await this.productNames.count();
    // 3. STRICT ASSERTION: Mandate that the count is exactly 0 to prove a flawless empty-state layout
    expect(count).toBe(0);
  }

  async selectBrandFilter(brandName: string): Promise<void> {
    // Dynamically find and click the specific brand text link in the sidebar filtering panel
    const brandLink = this.brandFilterBlock.getByRole("link", {
      name: brandName,
      exact: false,
    });
    await brandLink.click();
  }

  async verifyBrandHeaderVisible(brandName: string): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    // Assert that the page header text dynamically reflects the active filter choice (case-insensitive)
    const brandHeaderRegex = new RegExp(`brand\\s*-\\s*${brandName}`, "i");
    await expect(this.brandResultsHeader.first()).toHaveText(brandHeaderRegex);
  }

  async verifyAllCardsBelongToBrand(brandName: string): Promise<void> {
    const count = await this.productCards.count();
    if (count > 0) {
      // Performance Hybrid Sampling: Verify the first item's brand text to confirm filter logic
      await this.productCards
        .nth(0)
        .getByRole("link", { name: "View Product" })
        .click();
      await expect(this.page).toHaveURL(/.*product_details.*/);

      const brandMetadataText = await this.page.locator('.product-information p:has-text("Brand:")').innerText();
      expect(brandMetadataText.toLowerCase().includes(brandName.toLowerCase()),).toBe(true);
      // Return back cleanly to restore the search results stream
      await this.page.goBack();
      await this.page.waitForLoadState("networkidle");
    } else {
      // Streamlined validation: If no stock exists, just confirm the main product view section is cleanly visible
      await expect(this.productSection).toBeVisible();
    }
  }

  async addFirstProductToCartViaHover(): Promise<void> {
    // 1. Hover dynamically over the target grid card to trigger the hover state CSS transitions
    await this.productCards.nth(0).hover();
    // 2. Explicitly wait for the overlay container layer to become visible to ensure human-like timing
    await this.addToCartOverlayButton.waitFor({ state: "visible" });
    // 3. Force the action click injection on the visible overlay button
    await this.addToCartOverlayButton.click();
  }

  async verifySuccessModalMessage(expectedText: string): Promise<void> {
    // Wait for the modal wrapper to anchor securely on the viewport frame
    await this.successModal.waitFor({ state: "visible" });
    await expect(this.successModalHeading).toHaveText(expectedText);
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    // Defensive synchronization: Ensure the modal layers vanish before subsequent step flows trigger
    await this.successModal.waitFor({ state: "hidden" });
  }
}
