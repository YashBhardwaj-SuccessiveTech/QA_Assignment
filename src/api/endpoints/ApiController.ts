import { expect, type APIResponse } from "@playwright/test";
import { ApiClient } from "../client/ApiClient.js";

export class AutomationExerciseApiController {
    private apiClient: ApiClient;
    private lastResponse!: APIResponse;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    async verifyHttpStatus(expectedCode: number): Promise<void> {
        expect(this.lastResponse.status()).toBe(expectedCode);
    }

    async verifyResponseBodyMessage(expectedMessage: string): Promise<void> {
        const body = await this.lastResponse.json();
        expect(body.message).toBe(expectedMessage);
    }

    async verifyResponseCodeInBody(expectedResponseCode: number): Promise<void> {
        const body = await this.lastResponse.json();
        expect(body.responseCode).toBe(expectedResponseCode);
    }

    async getProductsList(): Promise<void> {
        this.lastResponse = await this.apiClient.get("productsList");
    }

    async validateProductsArrayStructure(): Promise<void> {
        const body = await this.lastResponse.json();
        expect(body).toHaveProperty("products");
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
        
        const firstProduct = body.products[0];
        expect(typeof firstProduct.id).toBe("number");
        expect(typeof firstProduct.name).toBe("string");
        expect(typeof firstProduct.price).toBe("string");
    }

    async postProductsListInvalid(): Promise<void> {
        this.lastResponse = await this.apiClient.post("productsList", {});
    }

    async getBrandsList(): Promise<void> {
        this.lastResponse = await this.apiClient.get("brandsList");
    }

    async validateBrandsPopulateBody(): Promise<void> {
        const body = await this.lastResponse.json();
        expect(body).toHaveProperty("brands");
        expect(Array.isArray(body.brands)).toBe(true);
        expect(body.brands.length).toBeGreaterThan(0);
    }

    async putBrandsListInvalid(): Promise<void> {
        this.lastResponse = await this.apiClient.put("brandsList", {});
    }

    async searchProduct(searchKeyword: string | null): Promise<void> {
        if (searchKeyword === null) {
            this.lastResponse = await this.apiClient.post("searchProduct");
        } else {
            this.lastResponse = await this.apiClient.post("searchProduct", { search_product: searchKeyword });
        }
    }

    async validateSearchResultsContainKeyword(keyword: string): Promise<void> {
        const body = await this.lastResponse.json();
        expect(body).toHaveProperty("products");
        for (const product of body.products) {
            expect(product.name.toLowerCase()).toContain(keyword.toLowerCase());
        }
    }

    async createUserAccount(payload: Record<string, string>): Promise<void> {
        this.lastResponse = await this.apiClient.post("createAccount", payload);
    }

    async updateUserAccount(payload: Record<string, string>): Promise<void> {
        this.lastResponse = await this.apiClient.put("updateAccount", payload);
    }

    async getUserDetailsByEmail(email: string): Promise<void> {
        this.lastResponse = await this.apiClient.get(`getUserDetailByEmail?email=${email}`);
    }

    async validateUserDetailsName(expectedName: string): Promise<void> {
        const body = await this.lastResponse.json();
        expect(body.user.name).toBe(expectedName);
    }

    async deleteUserAccount(payload: Record<string, string>): Promise<void> {
        this.lastResponse = await this.apiClient.delete("deleteAccount", payload);
    }

    async verifyLogin(payload: Record<string, string>): Promise<void> {
        this.lastResponse = await this.apiClient.post("verifyLogin", payload);
    }
}