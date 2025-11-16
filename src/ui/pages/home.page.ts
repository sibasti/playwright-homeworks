import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
  readonly mainTitle = this.page.locator(".welcome-text");
  readonly uniqueElement = this.mainTitle;

  async clickOnViewModule(moduleName: string) {
    const selector = `#${moduleName.toLowerCase()}-from-home`;
    await this.page.locator(selector).click();
  }
};
