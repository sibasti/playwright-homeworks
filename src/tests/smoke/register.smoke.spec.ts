import { test, expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATION {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  REQUIRED_FIELDS = "Please, provide valid data",
  USERNAME_REQUIRED = "Username is required",
  PASSWORD_REQUIRED = "Password is required",
  USERNAME_SHORT = "Username should contain at least 3 characters",
  USERNAME_SPACES = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_SHORT = "Password should contain at least 8 characters",
}

enum PAGE_TITLES {
  LOGIN = "Login",
  REGISTER = "Registration",
}

test.describe("[Smoke: Registration Form]", () => {
  const validCredentials: ICredentials = {
    username: "denis",
    password: "ValidPass123",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test("Registration form is visible", async ({ page }) => {
    const registrationForm = page.locator("#registerForm");
    await expect(registrationForm).toBeVisible();
    await expect(registrationForm).toHaveText(PAGE_TITLES.REGISTER);
  });

  test("Successful registration with valid data", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.REGISTER_SUCCESS, { timeout: 10000 });
  });

  test("Should not register with empty fields", async ({ page }) => {
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.REQUIRED_FIELDS);
  });

  test("Should not register with empty username", async ({ page }) => {
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await passwordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.USERNAME_REQUIRED);
  });

  test("Should not register with empty password", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.PASSWORD_REQUIRED);
  });

  test("Should not register with short username", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await usernameInput.fill("ab");
    await passwordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.USERNAME_SHORT);
  });

  test("Should not register with username containing spaces", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(" denis ");
    await passwordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.USERNAME_SPACES);
  });

  test("Should not register with short password", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill("Abc12");
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATION.PASSWORD_SHORT);
  });
});
