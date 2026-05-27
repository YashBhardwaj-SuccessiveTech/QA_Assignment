import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartTableBody: Locator;
  readonly firstRowDescription: Locator;
  readonly firstRowPrice: Locator;
  readonly firstRowQuantityButton: Locator;
  // ➔ Class ke top par ye declaration add karein:
  readonly firstRowTotalCell: Locator;

  constructor(page: Page) {
    this.page = page;

    // Target the main table container cleanly using its ID attribute
    this.cartTableBody = page.locator("#cart_info_table tbody");

    // Use semantic lookups within the first row item structure
    const firstRow = this.cartTableBody.locator("tr").first();
    this.firstRowDescription = firstRow.locator(".cart_description h4");
    this.firstRowPrice = firstRow.locator(".cart_price p");
    this.firstRowQuantityButton = firstRow.locator(".cart_quantity button");
    this.firstRowTotalCell = firstRow.locator(".cart_total p");
  }

  async verifyCartRowAttributes(
    expectedName: string,
    expectedPrice: string,
  ): Promise<void> {
    // Assert directly against the DOM components using exact metadata matching
    await expect(this.firstRowDescription).toHaveText(expectedName);
    await expect(this.firstRowPrice).toHaveText(expectedPrice);
  }

  async verifyCartRowQuantity(expectedQuantity: string): Promise<void> {
    // Keep locators and assertions safely inside the POM layer
    const actualQuantity = await this.firstRowQuantityButton.innerText();
    expect(actualQuantity.trim()).toBe(expectedQuantity);
  }

  async verifyCalculatedSubtotal(): Promise<void> {
    // 1. Scrape raw structural strings from live page layers
    const rawUnitPriceText = await this.firstRowPrice.innerText();
    const rawQuantityText = await this.firstRowQuantityButton.innerText();
    const rawTotalText = await this.firstRowTotalCell.innerText();

    // 2. Clean out currency text symbols (e.g., "Rs. 500" -> 500)
    const unitPrice = parseInt(rawUnitPriceText.replace(/[^0-9]/g, ""), 10);
    const quantity = parseInt(rawQuantityText, 10);
    const displayedTotal = parseInt(rawTotalText.replace(/[^0-9]/g, ""), 10);

    // 3. Apply mathematical assertion formula: Unit Price * Quantity
    const expectedTotal = unitPrice * quantity;
    expect(displayedTotal).toBe(expectedTotal);
  }
}