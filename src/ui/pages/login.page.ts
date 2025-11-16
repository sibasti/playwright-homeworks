import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { credentials } from "config/env";

export class LoginPage extends SalesPortalPage {
  readonly emailInput: Locator = this.page.locator("#emailinput");
  readonly passwordInput: Locator = this.page.locator("#passwordinput");
  readonly loginButton: Locator = this.page.locator("button[type='submit']");
  readonly welcomeText: Locator = this.page.locator(".welcome-text");

  readonly uniqueElement = this.emailInput;

  async fillCredentials() {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
};
