const { processOrders } = require('./service');

const orderFile = 'input/order.csv';

async function app() {
  const ProcessedResult = await processOrders(orderFile);

  if (ProcessedResult.success) {
    for (const item of ProcessedResult.data) {
      console.log(item.join(', '));
    }
  } else {
    console.log(ProcessedResult.message);
  }
}

app();
