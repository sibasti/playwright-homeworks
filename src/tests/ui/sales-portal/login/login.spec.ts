import { test, expect } from "@playwright/test";
import { LoginPage } from "ui/pages/login.page";

test.describe("[Sign-in Form]", () => {
  test("Sign in", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await expect(loginPage.emailInput).toBeVisible();

    await loginPage.fillCredentials();
    await loginPage.clickOnLoginButton();

    await loginPage.waitForOpened();
    await expect(loginPage.welcomeText).toBeVisible();
  });
});
