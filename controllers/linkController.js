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

exports.getLink = (req, res) => {
  const link = links.find((link) => link.shortCode === req.params.shortCode);

  if (!link) {
    return res.status(404).json({
      status: 'fail',
      message: `Link with short code "${req.params.shortCode}" does not exist.`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      link,
    },
  });
};

exports.goToLink = (req, res) => {
  const link = links.find((link) => link.shortCode === req.params.shortCode);

  if (!link) {
    return res.status(404).json({
      status: 'fail',
      message: `Link with short code "${req.params.shortCode}" does not exist.`,
    });
  }

  res.redirect(link.url);
};
