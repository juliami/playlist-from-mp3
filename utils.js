const fs = require("fs");
const _ = require("lodash");

const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "");

module.exports = {
  writeToFile: function (templateName, output) {
    const sorted = _.sortBy(output, ["index"]);
    const sortedList = sorted.map((item) => item.text).join("");
    const outputFilePath = `${process.env.OUTPUT_FOLDER}/${utc}_${templateName}.txt`;
    fs.appendFile(outputFilePath, sortedList, function (err) {
      if (err) {
        console.log(err);
        console.log(`${outputFilePath} could not be created`);
      } else {
        console.log(`${outputFilePath} created`);
      }
    });
  },
};
