import { SalesPortalPage } from "../../salesPortal.page";
import { Page, expect } from "@playwright/test";

export class DeleteModal extends SalesPortalPage {
  readonly uniqueElement = this.page
    .locator('[role="dialog"]')
    .filter({ hasText: "Delete Product" });

  readonly confirmButton = this.uniqueElement.getByRole("button", {
    name: /delete/i,
  });

  readonly cancelButton = this.uniqueElement.getByRole("button", {
    name: /cancel/i,
  });

  constructor(page: Page) {
    super(page);
  }

  async waitForClosed() {
    await expect(this.uniqueElement).toBeHidden();
  }

  async confirmDelete() {
    await this.confirmButton.click();
  }
}
