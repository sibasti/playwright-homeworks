import { test, expect } from "@playwright/test";

test.describe("[Dynamic Control test]", () => {
  const url = "https://the-internet.herokuapp.com/";

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
  });

  test("should interact with dynamic controls", async ({ page }) => {
    const removeButton = page.getByRole("button", { name: "Remove" });
    const addButton = page.getByRole("button", { name: "Add" });
    const checkbox = page.locator("input[type='checkbox']");
    const message = page.locator("#message");
    const header = page.getByRole("heading", { level: 4, name: "Dynamic Controls" });

    await expect(removeButton).toBeVisible({ timeout: 10000 });
    await expect(header).toHaveText("Dynamic Controls");

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await removeButton.click();
    await expect(checkbox).toBeHidden({ timeout: 15000 });
    await expect(message).toHaveText("It's gone!");

    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();

    await expect(checkbox).toBeVisible({ timeout: 15000 });
    await expect(message).toHaveText("It's back!");
  });
});
