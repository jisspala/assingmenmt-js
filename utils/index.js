const fs = require('fs');
const parse = require('csv-parse/lib/sync');

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
    result = {
      success: false,
    };
  }
  return result;
};
