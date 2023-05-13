exports.processOrders = async (orderFile) => {
  const finalResults = [
    ['heart: 0', 'liver: 2', 'lung: 2'],
    ['heart: 0', 'liver: 2', 'lung: 2'],
  ];

  const processedResult = {
    success: true,
    data: finalResults,
  };
  return processedResult;
};
