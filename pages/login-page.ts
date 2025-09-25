import { Page, Locator } from "@playwright/test";

export class LoginPage {
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
    this.loginComponent = page.locator('codere-new-login');
    // Buttons
    this.loginButton = this.loginComponent.locator('#btnaccess')
    this.registerButton = this.loginComponent.getByRole('button', { name: 'Regístrate', exact: true });
    this.forgetPassword = this.loginComponent.getByRole('button', { name: '¿Olvidaste tu contraseña?', exact: true });
    this.eyeOnButton = this.loginComponent.locator('ion-icon[name="eye"]');
    this.eyeOffButton = this.loginComponent.locator('ion-icon[name="eye-off"]');
    this.closeButton = this.loginComponent.locator('button.closeModal');
    // Inputs
    this.userField = this.loginComponent.locator('[formControlName="email"]');
    this.passwordField = this.loginComponent.locator('[formControlName="password"]');
    // Modals
    this.alertFillFields = page.getByRole('alertdialog', { name: 'Login' }).locator('ion-backdrop');
    this.alertInvalidLogin = page.getByRole('alertdialog', { name: 'Error de inicio de sesión' }).locator('ion-backdrop')
  }
}
