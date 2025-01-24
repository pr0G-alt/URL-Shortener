const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

const links = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

app.get('/getAllLinks', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: links.length,
    data: {
      links,
    },
  });
});

module.exports = app;
