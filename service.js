const { readCSV, validateOrders } = require('./utils');
const { availableOrgans, promotionScheme } = require('./config');

const formatOrder = (result) => {
  const formatedResult = [];

  for (const [key, value] of Object.entries(result)) {
    formatedResult.push(`${key}: ${value}`);
  }
  return formatedResult;
};

const calculateOrder = (order) => {
  const result = {};

  // Preparing result object model
  availableOrgans.map((item) => {
    result[item] = 0;
  });
  const organ = order.organ.toLowerCase();
  const cash = Number(order.cash);
  const price = Number(order.price);
  const bonusRatio = Number(order.bonus_ratio);

  // Calculating the number of organs purchased and bonuses
  const purchased = Math.floor(cash / price);
  const bonuseCounts = Math.floor(purchased / bonusRatio);

  // Adding the purchased organs to the result object
  result[organ] = purchased;

  // Adding the bonus organs to the result object
  if (bonuseCounts > 0 && organ in promotionScheme) {
    const bonusOrgans = promotionScheme[organ].bonus;

    for (const bonusOrgan in bonusOrgans) {
      const bonusAmount = bonuseCounts * bonusOrgans[bonusOrgan];
      result[bonusOrgan] += bonusAmount;
    }
  }
  return result;
};

exports.processOrders = async (orderFile) => {
  let processedResult;

  const csvResult = await readCSV(orderFile);
  if (csvResult.success) {
    const finalResults = [];
    const isValidOrders = validateOrders(csvResult.data);

    if (isValidOrders) {
      for (const order of csvResult.data) {
        // Calculating and applying the bonus
        const calculatedResult = calculateOrder(order);
        //Formating the w.r.t. output
        const formatedResult = formatOrder(calculatedResult);
        finalResults.push(formatedResult);
      }

      processedResult = {
        success: true,
        data: finalResults,
      };
    } else {
      processedResult = {
        success: false,
        message: 'orders are not valid',
      };
    }
  } else {
    processedResult = {
      success: false,
      message: 'error in orderFile file reading',
    };
  }
  return processedResult;
};
