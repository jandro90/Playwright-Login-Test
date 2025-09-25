import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test.describe.configure({ mode: "serial" });

test.describe("@Smoke - Login Page", () => {
  test("Login Modal UI elements is visible", async ({page}) => {
    const loginPage: LoginPage = new LoginPage(page);

    await test.step('When user Click to "ACCESS" login modal is open', async () => {
      await loginPage.openLoginModal();
      await expect(loginPage.loginComponent).toBeVisible();
    });
    await test.step("User/Email input is visible", async () => {
      await expect(loginPage.userField).toBeVisible();
    });
    await test.step("Password input is visible", async () => {
      await expect(loginPage.passwordField).toBeVisible();
      await loginPage.passwordField.fill('1234')
    });
    await test.step("Access button is visible", async () => {
      await expect(loginPage.loginButton).toBeVisible();
    });
    await test.step("Register button is visible", async () => {
      await expect(loginPage.registerButton).toBeVisible();
    });
    await test.step("Close Login Modal is visible", async () => {
      await expect(loginPage.closeButton).toBeVisible();
    });
  });
});
