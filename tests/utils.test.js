const { readCSV, validateOrders } = require('../utils');

let filePath = 'tests/test_assets/correct_orders.csv';

afterEach(() => {
  filePath = 'tests/test_assets/correct_orders.csv';
});

describe('read csv file data with readCSV', () => {
  test('should return parsed csv data with correct status', async () => {
    filePath = 'tests/test_assets/correct_orders.csv';
    const result = await readCSV(filePath);
    expect(result.success).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });
  test('should return unsuccessful status for non-exist csv file', async () => {
    filePath = 'nofile';
    const processedOrders = await readCSV(filePath);
    expect(processedOrders.success).toBe(false);
  });
});

describe('validate order with validateOrders', () => {
  test('should return true status for valid order', async () => {
    const validOrders = [];
    validOrders.push({
      organ: 'liver',
      cash: '10',
      price: '10',
      bonus_ratio: '1',
    });
    const result = await validateOrders(validOrders);
    expect(result).toBe(true);
  });

  test('should return false status for invalid order', async () => {
    const validOrders = [];
    validOrders.push({
      organ: 'liver',
      cash: '10',
      price: '10',
      bonus_ratio: '0',
    });
    const result = await validateOrders(validOrders);
    expect(result).toBe(false);
  });

  test('should return false status for invalid price', async () => {
    const validOrders = [];
    validOrders.push({
      organ: 'liver',
      cash: '10',
      price: 'pp',
      bonus_ratio: '0',
    });
    const result = await validateOrders(validOrders);
    expect(result).toBe(false);
  });
});
