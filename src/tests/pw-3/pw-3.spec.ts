import test, { expect } from "@playwright/test";
import {
  userData,
  invalidUserData,
  invalidLoginData,
  NOTIFICATIONS,
} from "./register.data.spec";

const URL = "https://anatoly-karpovich.github.io/demo-login-form/";

const selectors = {
  loginUsername: "#userName",
  loginPassword: "#password",
  loginSubmit: "#submit",
  loginError: "#errorMessage",

  openRegister: "#registerOnLogin",
  regUsername: "#userNameOnRegister",
  regPassword: "#passwordOnRegister",
  regSubmit: "#register",
  regBack: "#backOnRegister",
  regMessage: "#errorMessageOnRegister",
};

test.describe("[Demo Login Form]", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
  });

  // ---------- Позитивная регистрация (DDT) ----------
  for (const { title, credentials, message } of userData) {
    test(title, async ({ page }) => {
      await page.locator(selectors.openRegister).click();
      await page.locator(selectors.regUsername).fill(credentials.username);
      await page.locator(selectors.regPassword).fill(credentials.password);
      await page.locator(selectors.regSubmit).click();

      await expect(page.locator(selectors.regMessage)).toHaveText(message);
      // чтобы не ломать следующий тест своим состоянием
      if (message === NOTIFICATIONS.REGISTRATION_SUCCESS) {
        await page.locator(selectors.regBack).click();
      }
    });
  }

  // ---------- Негативная регистрация (DDT) ----------
  for (const { title, credentials, message } of invalidUserData) {
    test(title, async ({ page }) => {
      await page.locator(selectors.openRegister).click();
      await page.locator(selectors.regUsername).fill(credentials.username);
      await page.locator(selectors.regPassword).fill(credentials.password);
      await page.locator(selectors.regSubmit).click();

      await expect(page.locator(selectors.regMessage)).toHaveText(message);
    });
  }

  for (const { title, credentials, loginCredentials, message } of invalidLoginData) {
    test(title, async ({ page }) => {

      await page.locator(selectors.openRegister).click();
      await page.locator(selectors.regUsername).fill(credentials.username);
      await page.locator(selectors.regPassword).fill(credentials.password);
      await page.locator(selectors.regSubmit).click();
      await expect(page.locator(selectors.regMessage)).toHaveText(
        NOTIFICATIONS.REGISTRATION_SUCCESS
      );
      await page.locator(selectors.regBack).click();

      await page.locator(selectors.loginUsername).fill(loginCredentials!.username);
      await page.locator(selectors.loginPassword).fill(loginCredentials!.password);
      await page.locator(selectors.loginSubmit).click();

      await expect(page.locator(selectors.loginError)).toHaveText(message);
    });
  }
});