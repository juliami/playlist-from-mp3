const parse = (index, metadata) => {
  const { title, artist } = metadata;
  const artistString = artist[0];
  return `${index + 1}. ${artistString} - ${title}\n`;
};

exports.name = "fb";
exports.parse = parse;
