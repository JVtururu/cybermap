const express = require('express');
const path = require('path');

const app = express();

// Serve todos os arquivos da pasta frontend (HTML, CSS, JS, SVG, JSON)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor do totem rodando em http://localhost:3000');
});