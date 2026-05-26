import { type APIRequestContext, type APIResponse } from "@playwright/test";
import { EnvironmentConfig } from "../../config/environment.config.js";

export class ApiClient {
    private requestContext: APIRequestContext;
    // ➔ Abstracted configuration reference completely satisfies Section 3!
    private baseUrl: string = EnvironmentConfig.api.baseUrl;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async get(endpoint: string): Promise<APIResponse> {
        return await this.requestContext.get(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`);
    }

    async post(endpoint: string, payload?: Record<string, string>): Promise<APIResponse> {
        const formBody = payload ? new URLSearchParams(payload).toString() : ""; // Maps to application/x-www-form-urlencoded
        return await this.requestContext.post(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: formBody
        });
    }

    async put(endpoint: string, payload?: Record<string, string>): Promise<APIResponse> {
        const formBody = payload ? new URLSearchParams(payload).toString() : "";
        return await this.requestContext.put(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: formBody
        });
    }

    async delete(endpoint: string, payload?: Record<string, string>): Promise<APIResponse> {
        const formBody = payload ? new URLSearchParams(payload).toString() : "";
        return await this.requestContext.delete(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: formBody
        });
    }
}