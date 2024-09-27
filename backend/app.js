const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Cosmetics Warehouse API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
