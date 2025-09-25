import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginModal();
});

test.describe('@Smoke - Login Page', () => {
    test('When user Click to "ACCESS" login modal is open', async () => {
        await expect(loginPage.loginComponent).toBeVisible();
    });
    test('User/Email input is visible', async () => {
        await expect(loginPage.userField).toBeVisible();
    });
    test('Password input is visible', async () => {
        await expect(loginPage.passwordField).toBeVisible();
    });
    test('Access button is visible', async () => {
        await expect(loginPage.loginButton).toBeVisible();
    });
    test('Register button is visible', async () => {
        await expect(loginPage.registerButton).toBeVisible();
    });
    test('Close Login Modal is visible', async () => {
        await expect(loginPage.closeButton).toBeVisible();
    });           
})
