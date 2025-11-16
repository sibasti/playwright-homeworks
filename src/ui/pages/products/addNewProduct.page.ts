import { SalesPortalPage } from "../salesPortal.page";

export class AddNewProductPage extends SalesPortalPage {
  readonly uniqueElement = this.page.locator(".page-title-text");

  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly noteInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-new-product");

  async fillForm(product) {
    await this.nameInput.fill(product.name);
    await this.manufacturerSelect.selectOption(product.manufacturer);
    await this.priceInput.fill(String(product.price));
    await this.amountInput.fill(String(product.amount));
    if (product.note) await this.noteInput.fill(product.note);
  }

  async clickSave() {
    await this.saveButton.click();
  }
};
