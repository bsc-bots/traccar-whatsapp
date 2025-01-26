const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const { sendMessage } = require('./lib/api');

const app = express();

app.use(cors());

// Middleware para capturar o corpo bruto da requisição
app.use((req, res, next) => {
  let rawBody = '';
  req.on('data', (chunk) => {
    rawBody += chunk;
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(
        rawBody.replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove caracteres de controle
      );
      next();
    } catch (err) {
      console.error('Erro ao processar JSON:', rawBody);
      res.status(400).json({ error: 'Invalid JSON format' });
    }
  });
});

// Rota principal
app.post('/', async (req, res) => {
  const data = req.body;

  // Validação dos dados
  if (!data.apiKey || typeof data.apiKey !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "apiKey".' });
  }
  if (!data.number || !/^\d+$/.test(data.number)) {
    return res.status(400).json({ error: 'Invalid or missing "number". It should contain only digits.' });
  }
  if (!data.text || typeof data.text !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "text". It should be a string.' });
  }
  if (!data.endPoint || !data.endPoint.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing "endPoint". It should be a valid URL.' });
  }

  try {
    const response = await sendMessage(data.apiKey, data.number, data.text, data.endPoint);
    res.json(response);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});