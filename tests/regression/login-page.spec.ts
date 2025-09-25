import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test.describe.configure({ mode: "serial" });

test.describe("@Regression - Login Page", () => {
  let loginPage: LoginPage;
  let browser: Page;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    browser = page
    await loginPage.openLoginModal();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('Core UI Elements are visible', async () => {
    await test.step('User/Email input is visible', async () => {
      await expect(loginPage.userField).toBeVisible();
    });
    await test.step('Password input is visible', async () => {
      await expect(loginPage.passwordField).toBeVisible();
    });
    await test.step('Access button is visible', async () => {
      await expect(loginPage.loginButton).toBeVisible();
    });
    await test.step('Register button is visible', async () => {
      await expect(loginPage.registerButton).toBeVisible();
    });
    await test.step('Close Login Modal is visible', async () => {
      await expect(loginPage.closeButton).toBeVisible();
    });
  });

  test('Login Modal can be opened and closed', async () => {
    await test.step('When user click on X, login modal should be close', async () => {
      await loginPage.closeButton.click();
      await expect(loginPage.loginComponent).not.toBeVisible();
    })
    
    await test.step('When user Click to "ACCESS" login modal is open', async () => {
      const accessButton = browser.getByRole('button', { name: 'Acceder', exact: true }); 
      await accessButton.click();
      await expect(loginPage.loginComponent).toBeVisible();
    });
  })

  test('Username and Password fields validation', async () => {
    await test.step('Username Input can be filled', async () => {
      const userName: string = 'TestUserName'
      await loginPage.userField.fill(userName);
      await expect(loginPage.userField).toHaveValue(userName);
    });
    await test.step('Password Input can be filled', async () => {
      const password: string = 'abcd1234'
      await loginPage.passwordField.fill(password);
      await expect(loginPage.passwordField).toHaveValue(password);
    });
    await test.step('Password field should be of type "password" to ensure input is masked', async () => {
     const inputType = await loginPage.passwordField.getAttribute('type');
      expect(inputType).toBe('password');
    })
    await test.step('When click on eye-icon password field should show the value', async () => {
      await loginPage.eyeOnButton.click();
      const inputType = await loginPage.passwordField.getAttribute('type');
      expect(inputType).toBe('text')
    });
    await test.step('When click on eye-icon password again field should masked', async () => {
      await loginPage.eyeOffButton.click();
      const inputType = await loginPage.passwordField.getAttribute('type');
      expect(inputType).toBe('password');
    })
  });

  test('Register Button is working properly', async () => {
    await test.step('Register Button is visible', async () => {
      await expect(loginPage.registerButton).toBeVisible();
    });
    await test.step('Register button should redirect to "/RegistroNewPage"', async () => {
        await loginPage.registerButton.click();
        await expect(browser).toHaveURL(/RegistroNewPage/)
    })
  });

  test('Should show error modal when trying to login without filling (username & password)', async () => {
    await loginPage.loginButton.click();
    await expect(loginPage.alertFillFields).toBeVisible();
  });

  test('Should show error modal when trying to login without filling username but password is filled', async () => {
    await loginPage.passwordField.fill('1234Abcd');
    await loginPage.loginButton.click();
    await expect(loginPage.alertFillFields).toBeVisible();
  });
  
  test('Should show error modal when trying to login without filling password but username is filled', async () => {
    await loginPage.userField.fill('User123');
    await loginPage.loginButton.click();
    await expect(loginPage.alertFillFields).toBeVisible();
  });

  test('Access Button is working properly', async () => {
    await test.step('Access Button is visible', async () => {
      await expect(loginPage.loginButton).toBeVisible();
    });
    await test.step('Access button should call to "/login" to validate', async () => {
        await loginPage.userField.fill('user123');
        await loginPage.passwordField.fill('1234')
        await loginPage.loginButton.click();

        const loginRequest = await browser.waitForResponse((res) => {
          return res.url().includes("/login") && res.request().method() === "POST";
        });
        await expect(loginRequest).toBeTruthy();
    })
  });

  test('Error alert should be displayed when user try login with invalid data ', async () => {
    await test.step('Invalid credentials alert should be displayed', async () => {
      await loginPage.userField.fill('User123');
      await loginPage.passwordField.fill('abcd1234');
      await loginPage.loginButton.click();
      await expect(loginPage.alertInvalidLogin).toBeVisible();
    });

    await test.step('Invalid credentials alert should contains forgot password link', async () => {
      await expect(loginPage.forgetPassword).toBeVisible();
    })

    await test.step('When user click in forgot password Remember pass process should be init ', async () => {
      // This is working, but a new class called RememberPasswordPage should be created because it represents a separate component/flow, in order to maintain the Page Object Model architecture properly.
      const rememberPassModal = await browser.locator('codere-new-login');
      await expect(rememberPassModal).toBeVisible();
    })
  })
});
