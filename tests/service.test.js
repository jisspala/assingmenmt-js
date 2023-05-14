const { processOrders } = require('../service');
const constants = require('../utils/stringConstants');

let filePath = 'tests/test_assets/correct_orders.csv';

afterEach(() => {
  filePath = 'tests/test_assets/correct_orders.csv';
});

describe('processOrders', () => {
  test('should return correct result status and data', async () => {
    filePath = 'tests/test_assets/correct_orders.csv';
    const expectedResult = [
      ['heart: 0', 'liver: 2', 'lung: 2'],
      ['heart: 4', 'liver: 0', 'lung: 0'],
      ['heart: 0', 'liver: 0', 'lung: 1'],
    ];
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(true);
    expect(processedOrders.data?.length).toBeGreaterThan(0);
    expect(processedOrders.data).toEqual(expectedResult);
  });

  test('should return correct result status and data for the organ which dont have any bonus ', async () => {
    filePath = 'tests/test_assets/correct_orders_new_organ.csv';
    const expectedResult = [
      ['heart: 0', 'liver: 2', 'lung: 2'],
      ['heart: 0', 'liver: 0', 'lung: 0', 'neworgan: 3'],
    ];

    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(true);
    expect(processedOrders.data?.length).toBeGreaterThan(0);
    expect(processedOrders.data).toEqual(expectedResult);
  });

  test('should return error message and status when order file is not exists', async () => {
    filePath = 'nofile';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe(constants.INVALID_CSV);
  });

  test('should return error message and status when order bonus_ratio is zero', async () => {
    filePath = 'tests/test_assets/orders_zero_bonus_ratio.csv';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe(constants.INVALID_ORDERS);
  });

  test('should return error message and status when order price is invalid', async () => {
    filePath = 'tests/test_assets/orders_invalid_price.csv';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe(constants.INVALID_ORDERS);
  });

  test('should return error message and status when order file is empty', async () => {
    filePath = 'tests/test_assets/no_data.csv';
    const processedOrders = await processOrders(filePath);
    expect(processedOrders.success).toBe(false);
    expect(processedOrders.message).toBe(constants.INVALID_ORDERS);
  });
});
