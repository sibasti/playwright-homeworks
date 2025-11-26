import { Page } from '@playwright/test';

export class MetricsMock {
  constructor(private page: Page) {}

  async homePageMetrics(response: unknown) {
    await this.page.route('**/metrics', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    });
  }
}
