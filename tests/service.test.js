const { processOrders } = require('../service');

let filePath = 'tests/test_assets/correct_orders.csv';

afterEach(() => {
  filePath = 'tests/test_assets/correct_orders.csv';
});

describe('processOrders', () => {
  test('should return correct result status and data', async () => {
    filePath = 'tests/test_assets/correct_orders.csv';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(true);
    expect(processedOrders.data.length).toBeGreaterThan(0);
  });
  test('should return error message and status when order file is not exists', async () => {
    filePath = 'nofile';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe('error in orderFile file reading');
  });
});
