require("dotenv").config();
var fs = require("fs");
const path = require("path");
var mm = require("musicmetadata");
const _ = require("lodash");
const templates = require("./templates/index.js");
const utils = require("./utils");
const EXTENSION = ".mp3";

var files = fs.readdirSync(process.env.INPUT_FOLDER);
const musicFiles = files.filter((file) => {
  return path.extname(file).toLowerCase() === EXTENSION;
});
const output = [];
const addSong = (string) => {
  output.push(string);
};

const templatesObject = templates.templates;

const templateName = process.argv.slice(2)[0];
const selectedTemplate = templatesObject[templateName];

if (!selectedTemplate && templateName !== "all") {
  // add colors
  console.log(`template name ${templateName} does not exist`);
  return false;
}

function processMusicFiles(t) {
  var itemsProcessed = 0;

  console.log(t);
  musicFiles.forEach((fileName, index, array) => {
    var path = `${process.env.INPUT_FOLDER}/${fileName}`;
    mm(fs.createReadStream(path), function (err, metadata) {
      if (err) throw err;
      addSong(t.parse(index, metadata));
      itemsProcessed++;
      if (itemsProcessed === array.length) {
        utils.writeToFile(t.name, output);
      }
    });
  });
}

if (templateName === "all") {
  _.keys(templatesObject).forEach((key) => {
    processMusicFiles(templatesObject[key]);
  });
  return false;
} else {
  processMusicFiles(selectedTemplate);
}
