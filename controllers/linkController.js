const fs = require('fs');

const links = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

exports.getAllLinks = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: links.length,
    data: {
      links,
    },
  });
};
