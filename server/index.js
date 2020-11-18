const express = require('express');
const logger = require('morgan');
const cookieparser = require('cookie-parser');
const path = require('path');

const port = process.env.port || 3000
const app = express()

app.use(logger('dev'));
app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, "..", 'client', 'build', 'index.html'))
);

app.listen(port);