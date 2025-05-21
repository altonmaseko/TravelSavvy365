const express = require('express');
const app = express();
const port = 3000;

app.get('/test', (req, res) => {
  res.send('Test route');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});