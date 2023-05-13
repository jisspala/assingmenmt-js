const { processOrders } = require('../service');
describe('processOrders', () => {
  const filePath = 'dummy.csv';

  test('should return correct result status', async () => {
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(true);
  });
  test('should return correct processed orders result', async () => {
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.data.length).toBeGreaterThan(0);
  });
});
