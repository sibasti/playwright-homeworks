import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
  readonly mainTitle = this.page.locator(".welcome-text");
  readonly uniqueElement = this.mainTitle;
  readonly orderThisYearMetric = this.page.locator('#total-orders-container p.card-text');
  readonly totalRevenueMetric = this.page.locator('#total-revenue-container p.card-text');
  readonly newCustomerMetric = this.page.locator('#total-customers-container p.card-text');
  readonly avgOrdersValue = this.page.locator('#avg-orders-value-container p.card-text');
  readonly canceledOrdersMetric = this.page.locator('#canceled-orders-container p.card-text');

  async clickOnViewModule(moduleName: string) {
    const selector = `#${moduleName.toLowerCase()}-from-home`;
    await this.page.locator(selector).click();
  }
};
