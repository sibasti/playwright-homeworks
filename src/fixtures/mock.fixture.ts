import { test as base, expect } from 'fixtures/page.fixture';
import { MetricsMock } from 'utils/metrics.mock';

export const test = base.extend<{
  mock: MetricsMock;
}>({
  mock: async ({ page }, use) => {
    const mock = new MetricsMock(page);
    await use(mock);
  },
});

export { expect };
