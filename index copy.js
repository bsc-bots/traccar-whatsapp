const express = require('express');
const cors = require('cors');
const { sendMessage } = require('./lib/api');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const data = req.body;

  const response = await sendMessage(data.apiKey, data.number, data.text, data.endPoint);

  res.json(response);
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
