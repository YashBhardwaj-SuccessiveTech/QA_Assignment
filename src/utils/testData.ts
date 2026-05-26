import { faker } from "@faker-js/faker";
import { UserData } from "../types/userData.js";

export function generateUserData(): UserData {

    return {

        name: faker.person.fullName(),

        email: faker.internet.email(),

        password: faker.internet.password(),

        firstName: faker.person.firstName(),

        lastName: faker.person.lastName(),

        address: faker.location.streetAddress(),

        state: faker.location.state(),

        city: faker.location.city(),

        zipcode: faker.location.zipCode(),

        mobileNumber: faker.phone.number()
    };
}