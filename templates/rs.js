const parse = (index, metadata) => {
  const { title, artist, album } = metadata;
  const artistString = artist[0];
  return { index, text: `${artistString}	${title}	${album}\n` };
};

exports.name = "rs";
exports.parse = parse;
