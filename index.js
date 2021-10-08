require("dotenv").config();
var fs = require("fs");
const path = require("path");
var mm = require("musicmetadata");

const rs = require("./templates/rs.js");

const EXTENSION = ".mp3";

var files = fs.readdirSync(process.env.INPUT_FOLDER);
const musicFiles = files.filter((file) => {
  return path.extname(file).toLowerCase() === EXTENSION;
});
const output = [];
const addSong = (string) => {
  output.push(string);
};

function writeToFile(templateName) {
  const k = output.join("");
  const outputFilePath = `${process.env.OUTPUT_FOLDER}/${templateName}_playlist.txt`;
  fs.appendFile(outputFilePath, k, function (err) {
    if (err) {
      console.log(err);
      console.log(`${outputFilePath} could not be created`);
    } else {
      console.log(`${outputFilePath} created`);
    }
  });
}

var itemsProcessed = 0;

musicFiles.forEach((fileName, index, array) => {
  var path = `${process.env.INPUT_FOLDER}/${fileName}`;
  mm(fs.createReadStream(path), function (err, metadata) {
    if (err) throw err;
    addSong(rs.template(metadata));
    itemsProcessed++;
    if (itemsProcessed === array.length) {
      writeToFile(rs.templateName);
    }
  });
});
