import { ApiClient } from "../api/client/ApiClient.js";
import { AutomationExerciseApiController } from "../api/endpoints/ApiController.js";
import { request as playwrightRequest } from "@playwright/test";

import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";

import {
  chromium,
  request,
  type Browser,
  type APIRequestContext
} from "@playwright/test";

import * as fs from "fs";

import { CustomWorld } from "../support/world.js";

import { HomePage } from "../pages/HomePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { AccountPage } from "../pages/AccoutPage.js";
import { ProductsPage } from "../pages/ProductPage.js";
import { CartPage } from "../pages/CartPage.js";
import { ContactPage } from "../pages/ContactPage.js";

import { Logger } from "../utils/logger.js";
import { MetadataCollector } from "../utils/metadata.js";

setDefaultTimeout(30 * 1000);

let browser: Browser;

function sanitizeFileName(value: string): string {
  return value
    .replace(/[<>:\"/\\|?*\x00-\x1F]+/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 200);
}

BeforeAll(async function () {

  browser = await chromium.launch({
    headless: true
  });
});

AfterAll(async function () {

  await browser.close();
});

Before(async function (this: CustomWorld, scenario) {

  // Initialize logger
  const originalTestName = scenario.pickle.name;
  const safeTestName = sanitizeFileName(originalTestName);
  this.logger = new Logger(safeTestName);

  // Log environmental metadata
  const metadata = MetadataCollector.collectEnvironmentMetadata(originalTestName);
  const metadataPayload = MetadataCollector.formatMetadata(metadata);
  this.logger.info(metadataPayload);
  await this.attach(metadataPayload, "text/plain");
  this.logger.info(`Test started: ${originalTestName}`);

  // Create new browser context for the scenario
  this.context = await browser.newContext();
  this.logger.info("Browser context created");

  // Start tracing for the scenario
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });
  this.logger.debug("Tracing started with screenshots, snapshots, and sources");

  this.page = await this.context.newPage();
  this.logger.info("New page created");

  // Create a separate API request context for API-driven scenarios
  this.requestContext = await request.newContext();
  this.logger.info("API request context created");

  this.pages = {

    homePage: new HomePage(this.page),

    loginPage: new LoginPage(this.page),

    accountPage: new AccountPage(this.page),

    productsPage: new ProductsPage(this.page),

    cartPage: new CartPage(this.page),

    contactPage: new ContactPage(this.page)
  };

  this.logger.info("Page objects initialized");

  this.apiRequestContext = await playwrightRequest.newContext();
  const apiClient = new ApiClient(this.apiRequestContext);
  this.apiController = new AutomationExerciseApiController(apiClient);

});

After(async function (
  this: CustomWorld,
  scenario
) {

  this.logger.info(`Test completed with status: ${scenario.result?.status}`);

  await this.apiRequestContext.dispose();

  if (scenario.result?.status === Status.FAILED) {

    this.logger.error(`Test FAILED: ${scenario.pickle.name}`);
    if (scenario.result.message) {
      this.logger.error(`Error message: ${scenario.result.message}`);
    }

    // Create folders if not exist
    fs.mkdirSync(
      "reports/screenshots",
      { recursive: true }
    );

    fs.mkdirSync(
      "reports/traces",
      { recursive: true }
    );

    const safeArtifactName = sanitizeFileName(scenario.pickle.name);

    // Screenshot path
    const screenshotPath =
      `reports/screenshots/${safeArtifactName}.png`;

    // Capture screenshot
    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    this.logger.info(`Screenshot captured: ${screenshotPath}`);

    // Attach screenshot to Allure
    await this.attach(
      screenshot,
      "image/png"
    );

    // Trace path
    const tracePath =
      `reports/traces/${safeArtifactName}.zip`;

    // Stop tracing and save trace
    await this.context.tracing.stop({
      path: tracePath
    });

    this.logger.info(`Trace file saved: ${tracePath}`);

    // Read trace file
    const traceFile =
      fs.readFileSync(tracePath);

    // Attach trace to Allure
    await this.attach(
      traceFile,
      "application/zip"
    );

    // Read and attach log file to Allure
    const logContent = this.logger.getLogContent();
    await this.attach(
      logContent,
      "text/plain"
    );

    this.logger.info("All artifacts attached to Allure report");

  } else {

    this.logger.info(`Test PASSED: ${scenario.pickle.name}`);

    // Stop tracing without saving
    await this.context.tracing.stop();

    // Attach log file even on success for audit trail
    const logContent = this.logger.getLogContent();
    await this.attach(
      logContent,
      "text/plain"
    );

    this.logger.info("Test log attached to Allure report");
  }

  await this.context.close();
  this.logger.info("Browser context closed");

  if (this.requestContext) {
    await this.requestContext.dispose();
    this.logger.info("API request context disposed");
  }
});