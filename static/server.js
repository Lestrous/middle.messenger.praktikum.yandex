const express = require('express');
const path = require('node:path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/`));

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, function () {
  console.log(`App is ready on port ${PORT}!`);
});
