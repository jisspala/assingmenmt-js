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
  test('should return error message and status when order bonus_ratio is zero', async () => {
    filePath = 'tests/test_assets/orders_zero_bonus_ratio.csv';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe('orders are not valid');
  });
  test('should return error message and status when order price is invalid', async () => {
    filePath = 'tests/test_assets/orders_invalid_price.csv';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe('orders are not valid');
  });
});
