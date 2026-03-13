const express = require('express');
const cors = require('cors');

const { sendMessage } = require('./lib/api');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {

  console.log("REQUEST RECEIVED:", req.body);

  const { apiKey, number, text, endPoint } = req.body;

  try {

    const response = await sendMessage(apiKey, number, text, endPoint);

    res.json(response);

  } catch (error) {

    console.error("ERROR:", error);

    res.status(500).json({
      error: "Failed sending message"
    });

  }

});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});