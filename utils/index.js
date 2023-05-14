const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const { constants } = require('./stringConstants');

exports.readCSV = async function (filename) {
  let data;
  let result;
  try {
    data = await parse(fs.readFileSync(filename), {
      columns: true,
      skip_empty_lines: true,
    });
    result = {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(`${constants.CSV_ERROR} : ${JSON.stringify(error?.message)}`);
    result = {
      success: false,
    };
  }
  return result;
};

exports.validateOrders = (orders) => {
  for (const order of orders) {
    const organ = order.organ;
    const cash = Number(order.cash);
    const price = Number(order.price);
    const bonusRatio = Number(order.bonus_ratio);
    if (isNaN(cash) || isNaN(price) || isNaN(bonusRatio)) {
      console.log(`${constants.INVALID_ORDER} : ${JSON.stringify(order)}`);

      return false;
    }
    if (!organ || cash <= 0 || price <= 0 || bonusRatio < 1) {
      console.log(`${constants.INVALID_ORDER} : ${JSON.stringify(order)}`);

      return false;
    }

    return true;
  }
};
