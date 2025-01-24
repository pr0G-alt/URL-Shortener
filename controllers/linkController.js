const fs = require('fs');
const crypto = require('crypto');

const links = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

const resError = (message, errCode, res) => {
  res.status(errCode).json({
    status: 'fail',
    message,
  });
};

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
  const link = links.find(
    (link) => link.shortCode === req.params.shortCode.toLowerCase()
  );

  if (!link) {
    return resError(
      `Link with short code "${req.params.shortCode}" does not exist.`,
      404,
      res
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      link,
    },
  });
};

exports.goToLink = (req, res) => {
  const link = links.find(
    (link) => link.shortCode === req.params.shortCode.toLowerCase()
  );

  if (!link) {
    return resError(
      `Link with short code "${req.params.shortCode}" does not exist.`,
      404,
      res
    );
  }

  res.redirect(link.url);
};

const validShortCode = (shortCode) => {
  return /[^a-z0-9\s-]/gi.test(shortCode);
};

const shortCodeExists = (shortCode) => {
  return links.map((link) => link.shortCode).includes(shortCode);
};

const validURL = (url) => {
  return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/.test(
    url
  );
};

exports.shortenLink = (req, res) => {
  if (!req.body.url) {
    return resError('Please provide a URL.', 400, res);
  }

  let shortCode = req.body.shortCode;

  if (!req.body.shortCode) {
    do {
      shortCode = crypto.randomBytes(8).toString('hex');
    } while (shortCodeExists(shortCode));
  }

  shortCode = shortCode.toLowerCase().replace(/\s+/g, '-');

  if (validShortCode(shortCode)) {
    return resError('Short code contains invalid characters.', 400, res);
  }

  if (shortCodeExists(shortCode)) {
    return resError('Short code already exists.', 400, res);
  }

  let url = req.body.url;
  if (!validURL(url)) {
    return resError('URL is not valid.', 400, res);
  }

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  const newLink = {
    shortCode,
    url,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  links.push(newLink);

  try {
    fs.writeFileSync(`${__dirname}/../data/data.json`, JSON.stringify(links));
    res.status(201).json({
      status: 'success',
      data: {
        link: newLink,
      },
    });
  } catch (err) {
    resError('Something went wrong.', 500, res);
  }
};

exports.updateLink = (req, res) => {
  const link = links.find(
    (link) => link.shortCode === req.params.shortCode.toLowerCase()
  );

  if (!link) {
    return resError(
      `Link with short code "${req.params.shortCode}" does not exist.`,
      404,
      res
    );
  }

  const linkIdx = links.indexOf(link);

  if (req.body.shortCode) {
    let shortCode = req.body.shortCode;
    shortCode = shortCode.toLowerCase().replace(/\s+/g, '-');

    if (validShortCode(shortCode)) {
      return resError('Short code contains invalid characters.', 400, res);
    }

    if (shortCodeExists(shortCode)) {
      return resError('Short code already exists.', 400, res);
    }

    links[linkIdx].shortCode = shortCode;
  }

  if (req.body.url) {
    let url = req.body.url;
    if (!validURL(url)) {
      return resError('URL is not valid.', 400, res);
    }

    links[linkIdx].url = url;
    if (!/^https?:\/\//i.test(url)) {
      links[linkIdx].url = `https://${url}`;
    }
  }

  links[linkIdx].updatedAt = new Date();

  try {
    fs.writeFileSync(`${__dirname}/../data/data.json`, JSON.stringify(links));
    res.status(201).json({
      status: 'success',
      data: {
        link: links[linkIdx],
      },
    });
  } catch (err) {
    resError('Something went wrong.', 500, res);
  }
};
