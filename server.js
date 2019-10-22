const express = require('express');

const app = express();
const PORT = 4001 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');

app.use(express.static('public'));
app.use(bp.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port: ${PORT}`);
});