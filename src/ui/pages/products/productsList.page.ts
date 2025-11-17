import { SalesPortalPage } from "../salesPortal.page";
import { DeleteModal } from "./components/delete.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator("[name='add-button']");
  readonly firstRow = this.page.locator("tbody tr").first();

  readonly uniqueElement = this.productsPageTitle;

  readonly deleteModal = new DeleteModal(this.page);

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

   tableRowByName(name: string) {
    return this.page.locator("tbody tr", { hasText: name });
  }

   deleteButton(name: string) {
    return this.tableRowByName(name)
    .locator('button[title="Delete"]');
}

  async getFirstRowProductData() {
    const row = this.firstRow;
    const name = await row.locator("td:nth-child(1)").innerText();
    const price = await row.locator("td:nth-child(2)").innerText();
    const manufacturer = await row.locator("td:nth-child(3)").innerText();

    return {
      name: name.trim(),
      price: price.trim(),
      manufacturer: manufacturer.trim()
    };
  }
};
