import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";

import type { Page, BrowserContext, APIRequestContext } from "@playwright/test";

import { Logger } from "../utils/logger.js";
import { ProductsPage } from "../pages/ProductPage.js";

export interface UserData {
  name: string;

  email: string;

  password: string;

  firstName: string;

  lastName: string;

  address: string;

  state: string;

  city: string;

  zipcode: string;

  mobileNumber: string;
}

import { HomePage } from "../pages/HomePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { AccountPage } from "../pages/AccoutPage.js";
import { CartPage } from "../pages/CartPage.js";
import { ContactPage } from "../pages/ContactPage.js";

import { AutomationExerciseApiController } from "../api/endpoints/ApiController.js";

export class CustomWorld extends World {
  page!: Page;

  context!: BrowserContext;

  requestContext?: APIRequestContext;

  logger!: Logger;

  userData!: UserData;

  // Explicitly define the scenario cache parameters here to enforce strict types
  savedCardName?: string;
  savedCardPrice?: string;

  apiRequestContext!: APIRequestContext;
  apiController!: AutomationExerciseApiController;

  pages!: {
    homePage: HomePage;
    loginPage: LoginPage;
    accountPage: AccountPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    contactPage: ContactPage;
  };

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);