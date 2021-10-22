require("dotenv").config();
var fs = require("fs");
const path = require("path");
var mm = require("musicmetadata");
const _ = require("lodash"); 
const templates = require("./templates/index.js");

const EXTENSION = ".mp3";

var files = fs.readdirSync(process.env.INPUT_FOLDER);
const musicFiles = files.filter((file) => {
  return path.extname(file).toLowerCase() === EXTENSION;
});
const output = [];
const addSong = (string) => {
  output.push(string);
};

const templateName = process.argv.slice(2)[0];
const template = templates.templates[templateName];

function writeToFile(templateName) {
  const sorted = _.sortBy(output, [ 'index']);
  const sortedList = sorted.map((item) => item.text).join("");
  const outputFilePath = `${process.env.OUTPUT_FOLDER}/${templateName}_playlist.txt`;
  fs.appendFile(outputFilePath, sortedList, function (err) {
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
    addSong(template.parse(index, metadata));
    itemsProcessed++;
    if (itemsProcessed === array.length) {
      writeToFile(template.name);
    }
  });
});
