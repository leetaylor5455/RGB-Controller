const express = require('express');
const app = express();

app.use('/', express.static('public'));

// PORT
const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;