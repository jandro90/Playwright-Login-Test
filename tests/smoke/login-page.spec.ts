import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test.describe.configure({ mode: "serial" });

test.describe("@Smoke - Login Page", () => {
  let loginPage: LoginPage;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.openLoginModal();
  });

  test.afterAll(async () => {
    await page.close();
  });

  // TESTS
  test('When user Click to "ACCESS" login modal is open', async ({ page }) => {
    await expect(loginPage.loginComponent).toBeVisible();
  });
  test("User/Email input is visible", async () => {
    await expect(loginPage.userField).toBeVisible();
  });
  test("Password input is visible", async () => {
    await expect(loginPage.passwordField).toBeVisible();
  });
  test("Access button is visible", async () => {
    await expect(loginPage.loginButton).toBeVisible();
  });
  test("Register button is visible", async () => {
    await expect(loginPage.registerButton).toBeVisible();
  });
  test("Close Login Modal is visible", async () => {
    await expect(loginPage.closeButton).toBeVisible();
  });
});
