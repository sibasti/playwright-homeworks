import { SalesPortalPage } from "../salesPortal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator("[name='add-button']");
  readonly firstRow = this.page.locator("tbody tr").first();

  readonly uniqueElement = this.productsPageTitle;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
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
