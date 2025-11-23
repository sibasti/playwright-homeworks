import { test as base, expect } from 'fixtures/page.fixture';
import { credentials, SALES_PORTAL_URL } from "config/env";
export const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
  loginAsUser: () => Promise<void>;
}>({
  loginAsAdmin: async ({ page, homePage }, use) => {
    await use(async () => {
      const emailInput = page.locator("#emailinput");
      const passwordInput = page.locator("#passwordinput");
      const loginButton = page.locator("button[type='submit']");

      await page.goto(SALES_PORTAL_URL);
       await emailInput.fill(credentials.username);
      await passwordInput.fill(credentials.password);
      await loginButton.click();

      await homePage.waitForOpened();
    });
  },
  loginAsUser: async ({ page, homePage }, use) => {
    await use(async () => {
      const emailInput = page.locator("#emailinput");
      const passwordInput = page.locator("#passwordinput");
      const loginButton = page.locator("button[type='submit']");

      await page.goto(SALES_PORTAL_URL);
       await emailInput.fill(credentials.username);
      await passwordInput.fill(credentials.password);
      await loginButton.click();

      await homePage.waitForOpened();
    });
  }
});

export { expect };
