import { test, expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATION {
  LOGIN_SUCCESS = "Logged in!",
  INVALID_CREDENTIALS = "Invalid credentials",
  REQUIRED_BOTH = "Credentials are required",
  REQUIRED_USERNAME = "Username is required",
  REQUIRED_PASSWORD = "Password is required",
}

enum PAGE_TITLES {
  LOGIN = "Login",
  REGISTER = "Registration",
}

test.describe("[Smoke: Login Form]", () => {
  const validCredentials: ICredentials = {
    username: "denis",
    password: "ValidPass123",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
  });

  test("Login form is visible and has correct title", async ({ page }) => {
    const loginForm = page.locator("#loginForm");
    await expect(loginForm).toBeVisible();
    await expect(loginForm).toHaveText(PAGE_TITLES.LOGIN);
  });

  test("Successful login with valid credentials", async ({ page }) => {
    const usernameInput = page.locator("#userName");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#submit");
    const successMessage = page.locator("#successMessage");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await loginButton.click();

    await expect(successMessage).toHaveText(NOTIFICATION.LOGIN_SUCCESS, { timeout: 10000 });
  });

  test("Should not login with empty username and password", async ({ page }) => {
    const loginButton = page.locator("#submit");
    const notification = page.locator("#errorMessage");

    await loginButton.click();
    await expect(notification).toHaveText(NOTIFICATION.REQUIRED_BOTH);
  });

  test("Should not login with empty username", async ({ page }) => {
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#submit");
    const notification = page.locator("#errorMessage");

    await passwordInput.fill(validCredentials.password);
    await loginButton.click();
    await expect(notification).toHaveText(NOTIFICATION.REQUIRED_USERNAME);
  });

  test("Should not login with empty password", async ({ page }) => {
    const usernameInput = page.locator("#userName");
    const loginButton = page.locator("#submit");
    const notification = page.locator("#errorMessage");

    await usernameInput.fill(validCredentials.username);
    await loginButton.click();
    await expect(notification).toHaveText(NOTIFICATION.REQUIRED_PASSWORD);
  });

  test("Should not login with incorrect password", async ({ page }) => {
    const usernameInput = page.locator("#userName");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#submit");
    const notification = page.locator("#errorMessage");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill("WrongPassword123");
    await loginButton.click();
    await expect(notification).toHaveText(NOTIFICATION.INVALID_CREDENTIALS);
  });

  test("Can navigate to registration form from login page", async ({ page }) => {
    const registerLink = page.locator("#registerOnLogin");
    const registrationForm = page.locator("#registerForm");

    await registerLink.click();
    await expect(registrationForm).toBeVisible();
    await expect(registrationForm).toHaveText(PAGE_TITLES.REGISTER);
  });
});
