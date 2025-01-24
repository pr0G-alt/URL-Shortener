const express = require('express');
const app = express();
const linkRouter = require('./routes/linkRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.use('/', linkRouter);

module.exports = app;
