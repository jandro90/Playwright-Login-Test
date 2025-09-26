import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test.describe("@Regression - Login Page", () => {
  let loginPage: LoginPage;
  let currentPage: Page;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    currentPage = page
    await loginPage.openLoginModal();
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
      const accessButton = currentPage.getByRole('button', { name: 'Acceder', exact: true }); 
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
        await expect(currentPage).toHaveURL(/RegistroNewPage/)
    })
  });

  test('Should alert modal when trying to login without filling (username & password)', async () => {
    await test.step('Press in Access button', async () => {
        await loginPage.loginButton.click();
    })
    await test.step('Alert modal should be visible', async () => {
        await expect(loginPage.alertFillFields).toBeVisible();
    })
    
  });

  test('Should show error modal when trying to login without filling username but password is filled', async () => {
    await test.step('Fill password field', async () => {
        await loginPage.passwordField.fill('1234Abcd');
    });
    await test.step('Press Access button', async () => {
        await loginPage.loginButton.click();
    });
    await test.step('Alert modal should be visible', async () => {
        await expect(loginPage.alertFillFields).toBeVisible();
    })
  });
  
  test('Should show error modal when trying to login without filling password but username is filled', async () => {
    await test.step('Fill User field', async () => {
        await loginPage.userField.fill('User123');
    });
    await test.step('Press Access button', async () => {
        await loginPage.loginButton.click();
    });
    await test.step('Alert modal should be visible', async () => {
        await expect(loginPage.alertFillFields).toBeVisible();
    })
  });

  test('Access Button is working properly', async () => {
    await test.step('Access Button is visible', async () => {
      await expect(loginPage.loginButton).toBeVisible();
    });
    await test.step('Fill Username & Password', async () => {
      await loginPage.userField.fill('user123');
      await loginPage.passwordField.fill('1234')
    });
    await test.step('Press Access  button', async () => {
      await loginPage.loginButton.click();
    })
    await test.step('(POST: /login) should be called to validate', async () => {
        const loginRequest = await currentPage.waitForResponse((res) => {
          return res.url().includes("/login") && res.request().method() === "POST";
        });
        await expect(loginRequest).toBeTruthy();
    })
  });

  test('Error alert should be displayed when user try login with invalid data ', async () => {
    await test.step('Fill invalid username & password', async () => {
      await loginPage.userField.fill('User123');
      await loginPage.passwordField.fill('abcd1234');
    });
    await test.step('Click on Access button', async () => {
      await loginPage.loginButton.click();
    });
    await test.step('Invalid credentials alert should be displayed', async () => {
      await expect(loginPage.alertInvalidLogin).toBeVisible();
    });
    await test.step('Invalid credentials alert should contains forgot password link', async () => {
      await expect(loginPage.forgetPassword).toBeVisible();
    });
    await test.step('When user click in forgot password Remember pass process should be init ', async () => {
      // This is working, but a new class called RememberPasswordPage should be created because it represents a separate component/flow, in order to maintain the Page Object Model architecture properly.
      const rememberPassModal = await currentPage.locator('codere-new-login');
      await expect(rememberPassModal).toBeVisible();
    })
  })
});
