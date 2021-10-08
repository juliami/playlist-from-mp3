const template = (metadata) => {
  const { title, artist, album } = metadata;
  const artistString = artist[0];
  return `${artistString}	${title}	${album}\n`;
};

exports.templateName = "rs";
exports.template = template;
