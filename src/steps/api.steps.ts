import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";

// Global cache object to safely propagate runtime dynamic variables between lifecycle hooks
const dataContext = {
    dynamicEmail: `api_user_${Date.now()}@automationtest.com`,
    baseName: "API Test User"
};

When("User executes a {string} request to {string}", async function (this: CustomWorld, method: string, endpoint: string) {
    if (method === "GET" && endpoint === "productsList") await this.apiController.getProductsList();
    if (method === "GET" && endpoint === "brandsList") await this.apiController.getBrandsList();
});

When("User executes an unsupported {string} request to {string}", async function (this: CustomWorld, method: string, endpoint: string) {
    if (method === "POST" && endpoint === "productsList") await this.apiController.postProductsListInvalid();
    if (method === "PUT" && endpoint === "brandsList") await this.apiController.putBrandsListInvalid();
});

// Using {int} to strictly satisfy Cucumber parameter parsing
Then("The response status code should be {int}", async function (this: CustomWorld, code: number) {
    await this.apiController.verifyHttpStatus(code);
});

Then("The response json property {string} should match {string}", async function (this: CustomWorld, property: string, text: string) {
    await this.apiController.verifyResponseBodyMessage(text);
});

Then("The response json property {string} should be {int}", async function (this: CustomWorld, property: string, code: number) {
    await this.apiController.verifyResponseCodeInBody(code);
});

Then("The response body should contain a valid array of products with type structures", async function (this: CustomWorld) {
    await this.apiController.validateProductsArrayStructure();
});

Then("The response body should populate a valid list of brand tracking elements", async function (this: CustomWorld) {
    await this.apiController.validateBrandsPopulateBody();
});

When("User searches for a product using keyword {string}", async function (this: CustomWorld, keyword: string) {
    await this.apiController.searchProduct(keyword);
});

Then("The matching array results should all contain the item keyword {string}", async function (this: CustomWorld, keyword: string) {
    await this.apiController.validateSearchResultsContainKeyword(keyword);
});

When("User dispatches a search request missing the product query parameter", async function (this: CustomWorld) {
    await this.apiController.searchProduct(null);
});

// =========================================================================
// API-007 User Lifecycle Steps (With Dynamic Data Generation Compliance)
// =========================================================================
When("User submits a create account request for {string} with email {string}", async function (this: CustomWorld, name: string, email: string) {
    // Dynamic generation layer overrides hardcoded attributes safely
    await this.apiController.createUserAccount({
        name: dataContext.baseName,
        email: dataContext.dynamicEmail,
        password: "securePassword123",
        title: "Mr",
        birth_date: "10",
        birth_month: "May",
        birth_year: "1995",
        firstname: "API",
        lastname: "Tester",
        company: "Automation Corp",
        address1: "123 Tech Lane",
        country: "India",
        state: "UP",
        city: "Noida",
        zipcode: "201301",
        mobile_number: "9999999999"
    });
});

When("User updates the account name to {string} for email {string}", async function (this: CustomWorld, newName: string, email: string) {
    dataContext.baseName = newName; // Update internal string state
    await this.apiController.updateUserAccount({
        name: dataContext.baseName,
        email: dataContext.dynamicEmail,
        password: "securePassword123",
        title: "Mr",
        birth_date: "10",
        birth_month: "May",
        birth_year: "1995",
        firstname: "API",
        lastname: "Tester",
        company: "Automation Corp",
        address1: "123 Tech Lane",
        country: "India",
        state: "UP",
        city: "Noida",
        zipcode: "201301",
        mobile_number: "9999999999"
    });
});

When("User fetches details for user account email {string}", async function (this: CustomWorld, email: string) {
    await this.apiController.getUserDetailsByEmail(dataContext.dynamicEmail);
});

Then("The backend data object user name attribute should match {string}", async function (this: CustomWorld, name: string) {
    await this.apiController.validateUserDetailsName(dataContext.baseName);
});

When("User requests destruction of the account with email {string}", async function (this: CustomWorld, email: string) {
    await this.apiController.deleteUserAccount({ email: dataContext.dynamicEmail, password: "securePassword123" });
});

When("User logs in via API using email {string} and password {string}", async function (this: CustomWorld, email: string, pass: string) {
    await this.apiController.verifyLogin({ email, password: pass });
});