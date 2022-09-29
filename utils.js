const fse = require("fs-extra");
const _ = require("lodash");

const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "");

const appendListToFile = (outputFilePath, list) => {
  fse.appendFile(outputFilePath, list, function (err) {
    if (err) {
      console.log(err);
      console.log(`${outputFilePath} could not be created`);
    } else {
      console.log(`${outputFilePath} created`);
    }
  });
};

const writeToFile = (templateName, output) => {
  const sorted = _.sortBy(output, ["index"]);
  const sortedList = sorted.map((item) => item.text).join("");
  const outputFilePath = `${process.env.OUTPUT_FOLDER}/${utc}_${templateName}.txt`;
  if (fse.existsSync(outputFilePath)) {
    fse.truncate(outputFilePath, 0, () => {
      console.log(`${outputFilePath} already exists. Updating...`);
      appendListToFile(outputFilePath, sortedList);
    });
  } else {
    appendListToFile(outputFilePath, sortedList);
  }
};

module.exports = {
  writeToFile: writeToFile,
};
