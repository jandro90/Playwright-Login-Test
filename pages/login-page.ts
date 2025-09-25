import { Page, Locator, Response } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginComponent: Locator;
  readonly closeButton: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly userField: Locator;
  readonly passwordField: Locator;
  readonly eyeOnButton: Locator;
  readonly eyeOffButton: Locator;
  readonly forgetPassword: Locator;
  readonly alertFillFields: Locator;
  readonly alertInvalidLogin: Locator;


  constructor(page: Page) {
    this.page = page;
    this.loginComponent = page.locator('codere-new-login');
    // Buttons
    this.loginButton = this.loginComponent.locator('#btnaccess')
    this.registerButton = this.loginComponent.getByRole('button', { name: 'Regístrate', exact: true });
    this.eyeOnButton = this.loginComponent.locator('ion-icon[name="eye"]');
    this.eyeOffButton = this.loginComponent.locator('ion-icon[name="eye-off"]');
    this.closeButton = this.loginComponent.locator('button.closeModal');
    this.forgetPassword = page.getByRole('button', { name: '¿Olvidó su contraseña?' })
    // Inputs
    this.userField = this.loginComponent.locator('ion-input[formcontrolname="username"] input');
    this.passwordField = this.loginComponent.locator('ion-input[formcontrolname="password"] input');
    // Modals
    this.alertFillFields = page.getByRole('alertdialog', { name: 'Login' }).locator('ion-backdrop');
    this.alertInvalidLogin = page.getByRole('alertdialog', { name: 'Error de inicio de sesión' }).locator('ion-backdrop');
  }

  async openLoginModal(): Promise<void> {
  // navigate to baseUrl
  const response = await this.page.goto('/');
  if (!response?.ok()) {
    throw new Error(`Impossible to load the page. Status: ${response?.status()}`);
  }

  // Accept Cookies. (if is visible)
  const acceptCookiesButton = this.page.getByRole('button', { name: 'Aceptar', exact: true });
  if (await acceptCookiesButton.isVisible()) {
    await acceptCookiesButton.click();
  }

  // Finally Open Login Modal
  const accessButton = this.page.getByRole('button', { name: 'Acceder', exact: true });
  await accessButton.click();
  }
}
